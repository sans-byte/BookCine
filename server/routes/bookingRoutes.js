const router = require("express").Router();
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const authMiddleWare = require("../middlewares/authMiddleware");

//post

router.post("/book-show", authMiddleWare, async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();

    //update seats
    const show = await Show.findById(req.body.show);
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });
    res.send({
      success: true,
      message: "Booking Successfull",
      data: savedBooking,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Booking Failed",
    });
  }
});

// get all  bookings by user id

router.get("/get-bookings", authMiddleWare, async (req, res) => {
  try {
    // we will be having show here so populate the show and then
    // nestedly populate the movie and theater
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movie",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theater",
          model: "Theater",
        },
      });
    res.send({
      success: true,
      message: "Bookings Fetched",
      data: bookings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
