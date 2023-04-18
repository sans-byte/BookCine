const router = require("express").Router();
const Movie = require("../models/movieModel");

// Get Routes
// =================================================================
// This route is handling getting all the movies form the database
router.get("/get-all-movies", async (req, res) => {
  try {
    const response = await Movie.find();
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
router.post("/add-movie", async (req, res) => {
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
router.post("/delete-movie", async (req, res) => {
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
router.put("/update-movie", async (req, res) => {
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
