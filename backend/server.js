const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
  'mongodb+srv://Admin:12345wera@englishdictionary-a8zjg.mongodb.net/dictionary?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this method fetches all available data in our database
router.get('/getData', (req, res) => {
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
  })

  return word;
}

// this method fetches data by id in our database
router.get('/getData/:id', (req, res) => {

  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: getWordById(data, parseInt(req.params.id)) });
  });
});

// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this method removes all existing data in our database
router.delete('/deleteAllData', (req, res) => {
  Data.deleteMany({}, (err) => {
    if (err) return res.send(err)
    return res.json({ success: true });
  });
});

// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, en, ru, bookmarks } = req.body;

  if (!id && id !== 0) {
    return res.json({
      success: false,
      error: 'Data must contain id',
    });
  }

  if (!en || !ru) {
    return res.json({
      success: false,
      error: 'Data must contain at least 1 word',
    });
  }

  data.id = id;
  data.en = en;
  data.ru = ru;
  data.bookmarks = bookmarks;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this method adds new data in our database
router.post('/putManyData', (req, res) => {

  let reqData = req.body;
  let newData = [];

  reqData.forEach((item) => {
    let data = new Data();
    const { id, en, ru, bookmarks } = item;

    if (!id && id !== 0) {
      return res.json({
        success: false,
        error: 'Data must contain id',
      });
    }

    data.id = id;
    data.en = en;
    data.ru = ru;
    data.bookmarks = bookmarks;

    newData.push(data);

  })

  Data.insertMany(reqData, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));