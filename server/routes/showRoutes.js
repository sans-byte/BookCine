const router = require("express").Router();
const Show = require("../models/showModel");

//post
//add shows
router.post("/add-show", async (req, res) => {
  try {
    const show = new Show(req.body);
    await show.save();
    res.send({
      success: true,
      message: "Show added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all shows by theater
router.post("/get-shows-by-theater", async (req, res) => {
  try {
    const shows = await Show.find({ theater: req.body.theaterId })
      .populate("movie")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data: shows,
      message: "Shows fetched successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
// get a perticular show by id and populate movie and theater inside it
router.post("/get-show-by-id", async (req, res) => {
  try {
    const show = await Show.findById(req.body._id)
      .populate("movie")
      .populate("theater");
    res.send({
      success: true,
      data: show,
      message: "Show fetched successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//delete a show by id
router.post("/delete-show", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
