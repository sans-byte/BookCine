const router = require("express").Router();
const Theater = require("../models/theaterModel");
const authMiddleWare = require("../middlewares/authMiddleware");
const Show = require("../models/showModel");

//Get Routes
router.get("/get-all-theaters", authMiddleWare, async (req, res) => {
  try {
    const response = await Theater.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Theaters fetched Successfully",
      data: response,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Post Routes
router.post("/get-all-theaters-by-owner", authMiddleWare, async (req, res) => {
  try {
    const response = await Theater.find({ owner: req.body.owner }).sort({
      createrAt: "-1",
    });
    res.send({
      success: true,
      message: "Theaters fetched Successfully",
      data: response,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/add-theater", authMiddleWare, async (req, res) => {
  try {
    const response = new Theater(req.body);
    await response.save();
    res.send({
      success: true,
      message: "Theater added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all theaters by movie and date

router.post(
  "/get-all-theaters-by-movie-and-date",
  authMiddleWare,
  async (req, res) => {
    try {
      const { movie, date } = req.body;
      //find all shows of a movie depending on the date
      const shows = await Show.find({ movie, date })
        .populate("theater")
        .sort({ createdAt: -1 });
      // get all unique theaters
      let uniqueTheaters = [];
      shows.forEach((show) => {
        const theater = uniqueTheaters.find((t) => t._id == show.theater._id);
        if (!theater) {
          const showForThisTheater = shows.filter(
            (showObj) => showObj.theater._id == show.theater._id
          );
          uniqueTheaters.push({
            ...show.theater._doc,
            shows: showForThisTheater,
          });
        }
      });
      res.send({
        data: uniqueTheaters,
        success: true,
        message: "Theaters fetched Successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: response.error,
      });
    }
  }
);

//delete theater data
router.post("/delete-theater", authMiddleWare, async (req, res) => {
  try {
    const response = await Theater.findByIdAndDelete(req.body._id);
    res.send({
      success: true,
      message: "Theater deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update
// update theaters
router.put("/update-theater", authMiddleWare, async (req, res) => {
  try {
    const response = await Theater.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      success: true,
      message: "Theater updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
