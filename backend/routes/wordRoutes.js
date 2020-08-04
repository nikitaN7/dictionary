const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const { getWordById, getMaxId } = require("../functions");

const Word = mongoose.model("Data");
const router = express.Router();

router.use(requireAuth);

router.get("/words", async (req, res) => {
  try {
    const words = await Word.find({ userId: req.user._id });
    res.json({ success: true, data: words });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.get("/words/:id", async (req, res) => {
  try {
    const words = await Word.find({ userId: req.user._id });

    res.json({
      success: true,
      data: getWordById(words, parseInt(req.params.id)),
    });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.patch("/words/:id", async (req, res) => {
  const { data } = req.body;
  const { id } = req.params;

  if (!data) {
    res.status(422).send({ error: "You must provide word data" });
  }

  try {
    const updatedWord = await Word.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true }
    );

    res.json({ success: true, data: updatedWord });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.delete("/words/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Word.findOneAndRemove({ id });
    res.json({ success: true });
  } catch (error) {
    res.status(422).send({ error });
  }
});

router.delete("/words", async (req, res) => {
  const userId = req.user._id;
  const { ids } = req.body;

  if (!ids || !ids.length) {
    res.status(422).send({ error: "You must provide an array of ids" });
  }

  try {
    await Word.deleteMany({ userId: userId, id: { $in: ids } });
    res.json({ success: true });
  } catch (error) {
    res.status(422).send({ error });
  }
});

router.post("/words", async (req, res) => {
  const { en, ru, bookmarks, examples, association, transcription } = req.body;

  if (!en || !ru) {
    return res.status(422).send({ error: "You must provide en and ru words" });
  }

  let word = new Word({
    en,
    ru,
    examples,
    bookmarks,
    association,
    transcription,
    userId: req.user._id,
  });

  try {
    const words = await Word.find();
    const maxId = getMaxId(words);

    if (!maxId || maxId === 0) {
      word.id = 1;
    }

    word.id = maxId + 1;
    await word.save();

    res.send({ data: word, success: true });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

router.post("/wordsList", async (req, res) => {
  let { data } = req.body;
  let newData = [];

  data.forEach((item) => {
    const { en, ru, bookmarks, examples, association, transcription } = item;

    if (!en || !ru) {
      return res
        .status(422)
        .send({ error: "You must provide en and ru words" });
    }

    let word = new Word({
      en,
      ru,
      examples,
      bookmarks,
      association,
      transcription,
      userId: req.user._id,
    });

    newData.push(word);
  });

  try {
    const words = await Word.insertMany(newData);
    res.send({ success: true, data: words });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
