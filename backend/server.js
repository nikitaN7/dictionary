const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`),
});

const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));
const router = express.Router();

const dbRoute = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.dbHost}/${process.env.dbName}?retryWrites=true&w=majority`;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

const getWordById = (list, id) => {
  let word = {};

  list.forEach((item) => {
    if (parseInt(item.id) === id) {
      word = item;
    }
  });

  return word;
};

// this method fetches data by id in our database
router.get("/getData/:id", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({
      success: true,
      data: getWordById(data, parseInt(req.params.id)),
    });
  });
});

// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;

  Data.findByIdAndUpdate(id, { $set: update }, { new: true })
    .then((date) => {
      res.json({ success: true, data: date });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this method removes all existing data in our database
router.delete("/deleteAllData", (req, res) => {
  Data.deleteMany({}, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this method adds new data in our database
const getMaxId = (arr) => {
  const idList = arr.map((item) => item.id);
  return Math.max(...idList, 0);
};

// this method adds new data in our database
router.post("/putData", (req, res) => {
  const { en, ru, bookmarks, examples, association, transcription } = req.body;

  let data = new Data();

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

  Data.find((err, dataList) => {
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

// this method adds new data in our database
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

  Data.insertMany(reqData, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(process.env.PORT || API_PORT, () =>
  console.log(`LISTENING ON PORT ${API_PORT}`)
);
