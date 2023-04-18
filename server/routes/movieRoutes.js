const router = require("express").Router();
const Movie = require("../models/movieModel");

// =================================================================
// Get Routes

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

// =================================================================
// Post Routes

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

// =================================================================

module.exports = router;
