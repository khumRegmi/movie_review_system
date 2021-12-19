const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  content: String,
  upVote: Number,
  downVote: Number,
  votes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      voteType: {
        type: String,
        enum: ["up", "down"],
      },
    },
  ],
});

module.exports = mongoose.model("Review", reviewSchema);
