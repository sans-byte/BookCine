const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    movieDescription: {
      type: String,
      required: true,
    },
    movieLanguage: {
      type: String,
      required: true,
    },
    movieGenre: {
      type: String,
      required: true,
    },
    movieDuration: {
      type: Number,
      required: true,
    },
    moviePosterURL: {
      type: String,
      required: true,
    },
    movieReleaseDate: {
      type: Date,
      required: true,
    },
    movieTrailerURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
