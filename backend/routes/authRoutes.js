const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const router = express.Router();

const mailgun = require('mailgun-js');
const mg = mailgun({
  apiKey: process.env.mgApiKey,
  domain: process.env.mgDomain,
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.jwtSecretKey);
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({ error: 'Invalid email or password' });
    }

    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.jwtSecretKey);
    res.send({ token });
  } catch (error) {
    console.log(error);
    return res.status(422).send({ error: 'Invalid email or password' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).send({ error: 'Must provide email' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(422)
      .send({ error: "User with with email doesn't exist" });
  }

  try {
    const token = jwt.sign({ userId: user._id }, process.env.jwtSecretKey, {
      expiresIn: '30m',
    });
    const link = `http://${req.headers.host}/reset-password/${token}`;
    const data = {
      from: 'noreply@hello.com',
      to: email,
      subject: 'Password Reset Link',
      html: `
          <h2>Please click on given link to reset your password</h2>
          <a href="${link}">Reset password link</a>
      `,
    };

    try {
      await user.updateOne({ resetPasswordToken: token });
    } catch (error) {
      return res.status(400).send({ error: 'Reset password link error' });
    }

    try {
      await mg.messages().send(data);
      res.send({
        message: 'Email has been sent. Please follow the instructions.',
      });
    } catch (error) {
      return res.status(422).send({ error: error.message });
    }

    res.send({ token });
  } catch (error) {
    console.log(error);
    return res.status(422).send({ error: 'Invalid email or password' });
  }
});

router.get('/reset-password', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(422).send({ error: 'Must provide token' });
  }

  try {
    await jwt.verify(token, process.env.jwtSecretKey);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .send({ error: 'Password reset token is invalid or has expired.' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  if (!token || !password || !confirmPassword) {
    return res
      .status(422)
      .send({ error: 'Must provide token, password, confirmPassword' });
  }

  if (password !== confirmPassword) {
    return res
      .status(422)
      .send({ error: 'Password and confirm password must be the same' });
  }

  try {
    await jwt.verify(token, process.env.jwtSecretKey);
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .send({ error: 'Password reset token is invalid or has expired.' });
  }

  try {
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res
        .status(422)
        .send({ error: "User with this token doesn't exist" });
    }

    user.password = password;
    user.resetPasswordToken = '';

    try {
      await user.save();
      return res.status(422).send({ error: 'The password has been changed' });
    } catch (error) {
      return res.status(422).send({ error: 'Reset password error' });
    }
  } catch (error) {
    return res
      .status(422)
      .send({ error: "User with this token doesn't exist" });
  }
});

module.exports = router;
