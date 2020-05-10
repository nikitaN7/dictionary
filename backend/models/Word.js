const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {
    id: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    en: String,
    ru: String,
    examples: {
      ru: String,
      en: String,
    },
    association: String,
    transcription: String,
    bookmarks: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", wordSchema);
