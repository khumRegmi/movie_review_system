const express = require("express");
const res = require("express/lib/response");
const app = express();

const mongoose = require("mongoose");

app.use(express.json());
require("dotenv/config");

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected to DB");
});

const User = require("./models/User");
const Movie = require("./models/Movie");
const Review = require("./models/Review");

// Create User
app.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  const result = await user.save();
  res.send(result);
  console.log(result);
});

// Get user info with the given id
app.get("/users/:id", async (req, res) => {
  try {
    const userInfo = await User.findById(req.params.id);
    res.json(userInfo);
    console.log(userInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

//Create a movie
app.post("/movies", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
    director: req.body.director,
  });

  const result = await movie.save();
  res.send(result);
  console.log(result);
});

//Get the movie info with id
app.get("/movies/:id", async (req, res) => {
  try {
    const movieInfo = await Movie.findById(req.params.id);
    res.json(movieInfo);
    console.log(movieInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update movie information
app.patch("/movies/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          genre: req.body.genre,
          year: req.body.year,
          director: req.body.director,
        },
      }
    );
    res.json(updatedMovie);
  } catch (err) {
    res.json({ message: err });
  }
});

//create a review for the given movie id
app.post("/movies/:id/reviews", async (req, res) => {
  try {
    const review = new Review({
      userId: req.body.userId,
      movieId: req.params.id,
      content: req.body.content,
      upVote: 0,
      downVote: 0,
      votes: [],
    });
    const result = await review.save();
    res.send(result);
  } catch (err) {
    res.json({ message: err });
  }
});

// get all the review of the id movie
app.get("/movies/:id/reviews", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Review.find({ movieId: id }).populate("userId");
    console.log(result);
    res.send(result);
  } catch (err) {
    res.json({ message: "Could not find the review" });
  }
});

// get the specific review
app.get("/movies/:id/reviews/:reviewId", async (req, res) => {
  try {
    const movieId = req.params.id;
    const reviewId = req.params.reviewId;
    const result = await Review.find({
      $and: [{ movieId: movieId }, { _id: reviewId }],
    });
    res.send(result);
  } catch (err) {
    res.send({ message: "Cannot get review. Sorry" });
  }
});

// delete the specific review
app.delete("/movies/:id/reviews/:reviewId", async (req, res) => {
  try {
    const movieId = req.params.id;
    const reviewId = req.params.reviewId;
    const result = await Review.remove({
      $and: [{ movieId: movieId }, { _id: reviewId }],
    });
    res.send(result);
  } catch (err) {
    console.log({ message: "Could not be deleted" });
  }
});

//create a vote (up/down)
app.post("/movies/:id/reviews/:reviewId/vote", async (req, res) => {
  const movieId = req.params.id;
  const reviewId = req.params.reviewId;
  const userId = req.body.userId;
  const voteType = req.body.voteType;
  const uniqueUser = await Review.find({ _id: reviewId });
  const result = uniqueUser[0].votes;
  const userArr = [];
  result.map((item) => {
    userArr.push(item.userId);
  });

  console.log(userArr);

  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i] == userId)
      return res.send("There is already a vote casted by this user");
  }

  console.log(voteType);

  if (voteType == "up" || voteType == "down") {
    try {
      const vote = {
        userId: userId,
        voteType: voteType,
      };
      const inc1 = voteType == "up" ? 1 : 0;
      const inc2 = voteType == "down" ? 1 : 0;

      console.log(inc1, inc2);
      await Review.updateOne(
        { _id: reviewId },
        { $push: { votes: vote } },
        { $inc: { upVote: 10 } }
      );

      await Review.updateOne({ _id: reviewId }, { $inc: { upVote: inc1 } });
      const result = await Review.updateOne(
        { _id: reviewId },
        { $inc: { downVote: inc2 } }
      );
      res.send(result);
    } catch {
      res.send({ message: "Some error" });
    }
  } else {
    return res.send(" Vote type can only be either up or down");
  }
});

app.listen(3001);
