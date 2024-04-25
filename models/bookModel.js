const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the contact name"]
    },
    author: {
      type: String,
      required: [true, "Please add the contact email address"]
    },
    publication_year: {
      type: Number
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
