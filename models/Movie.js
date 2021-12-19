const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: String,
  genre: [String],
  year: Number,
  director: String,
});

module.exports = mongoose.model("Movie", movieSchema);
