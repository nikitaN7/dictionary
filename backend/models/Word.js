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
      type: {
        ru: String,
        en: String,
      },
      default: {
        ru: null,
        en: null,
      },
    },
    association: {
      type: String,
      default: null,
    },
    transcription: {
      type: String,
      default: null,
    },
    bookmarks: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", wordSchema);
