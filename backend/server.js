require("./models/User");
require("./models/Word");

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
const authRoutes = require("./routes/authRoutes");
const { getDbRoute } = require("./functions");

const API_PORT = 3001;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));

const dbRoute = getDbRoute();

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/api", authRoutes); //Must be on the top of the other routes
app.use("/api", wordRoutes);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error", err);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || API_PORT, () =>
  console.log(`LISTENING ON PORT ${API_PORT}`)
);
