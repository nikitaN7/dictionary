const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const { getWordById, getMaxId } = require("../functions");

const Word = mongoose.model("Data");
const router = express.Router();

router.use(requireAuth);

router.get("/getData", (req, res) => {
  Word.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getData/:id", (req, res) => {
  Word.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({
      success: true,
      data: getWordById(data, parseInt(req.params.id)),
    });
  });
});

router.post("/updateData", (req, res) => {
  const { id, update } = req.body;

  Word.findByIdAndUpdate(id, { $set: update }, { new: true })
    .then((date) => {
      res.json({ success: true, data: date });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Word.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete("/deleteAllData", (req, res) => {
  Word.deleteMany({}, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/putData", (req, res) => {
  const { en, ru, bookmarks, examples, association, transcription } = req.body;

  let data = new Word();

  if (!en || !ru) {
    return res.json({
      success: false,
      error: "Data must contain at least 1 word",
    });
  }

  data.en = en;
  data.ru = ru;
  data.bookmarks = bookmarks || false;
  data.examples = examples || {
    ru: null,
    en: null,
  };
  data.association = association || null;
  data.transcription = transcription || null;

  Word.find((err, dataList) => {
    if (err) return res.json({ success: false, error: err });

    const maxId = getMaxId(dataList);

    if (!maxId || maxId === 0) {
      data.id = 1;
    }

    data.id = maxId + 1;

    data.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });
});

router.post("/putManyData", (req, res) => {
  let reqData = req.body;
  let newData = [];

  reqData.forEach((item) => {
    let data = new Data();
    const {
      id,
      en,
      ru,
      bookmarks,
      examples,
      association,
      transcription,
    } = item;

    if (!id && id !== 0) {
      return res.json({
        success: false,
        error: "Data must contain id",
      });
    }

    data.id = id;
    data.en = en;
    data.ru = ru;
    data.bookmarks = bookmarks || false;
    data.examples = examples || {
      ru: null,
      en: null,
    };
    data.association = association || null;
    data.transcription = transcription || null;

    newData.push(data);
  });

  Word.insertMany(reqData, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

module.exports = router;
