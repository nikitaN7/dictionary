require("./models/Word");
require("./models/User");

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`),
});

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const wordRoutes = require("./routes/wordRoutes");
const { getDbRoute } = require("./functions");

const API_PORT = 3001;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));

const dbRoute = getDbRoute();

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error", err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use("/api", wordRoutes);

app.listen(process.env.PORT || API_PORT, () =>
  console.log(`LISTENING ON PORT ${API_PORT}`)
);
