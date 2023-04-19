const router = require("express").Router();
const Movie = require("../models/movieModel");
const authmiddleware = require("../middlewares/authMiddleware");

// Get Routes
// =================================================================
// This route is handling getting all the movies form the database
router.get("/get-all-movies", authmiddleware, async (req, res) => {
  try {
    const response = await Movie.find().sort({ createdAt: "-1" });
    res.send({
      success: true,
      message: "Movies fetched successfully",
      statuscode: 200,
      data: response,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
      statuscode: 500,
    });
  }
});
// =================================================================

// Post Routes
// =================================================================
//  This route is handling adding a movie to the database
router.post("/add-movie", authmiddleware, async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "Movie Added",
      statuscode: 201,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
      statuscode: 500,
    });
  }
});

// This route is handling the delete a single movie from the database
router.post("/delete-movie", authmiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    console.log(req.body);
    res.send({
      success: true,
      message: "Movie Deleted successfully",
      statuscode: 200,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
      statuscode: 500,
    });
  }
});

// =================================================================

// Update routes
// =================================================================
// This route is handling updating a movie in the database
router.put("/update-movie", authmiddleware, async (req, res) => {
  try {
    const response = await Movie.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      success: true,
      message: "Movie Updated",
      statuscode: 200,
      data: response,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
      statuscode: 500,
    });
  }
});

// =================================================================

module.exports = router;
