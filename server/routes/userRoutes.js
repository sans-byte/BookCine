const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// Post routes

// Post route for handling the registration of the user
// 1. Check if the user is already registered or not if yes return error
// 2. if user does not exist, hash the password
// 3. save the user
router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    // Finding if the user is already registered
    if (userExist) {
      return res.send({
        message: "User already exists",
        success: false,
        statuscode: 400,
      });
    }

    if (req.body.password.length < 4)
      return res.send({
        message: "Password too short",
        success: false,
        statuscode: 400,
      });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //create a new user
    const user = await new User(req.body);
    await user.save();

    res.send({
      success: true,
      message: "User saved successfully",
      statuscode: 201,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      statuscode: error.status,
    });
  }
});

//Post route for handling the login of the user
//1. if user is not registered the return error that user does not exist
//2. if user is registered create a jwt and send it with data

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // if user is not registered the return error that user does not exist
    if (!user) {
      return res.send({
        message: "User does not exist",
        success: false,
        statuscode: 400,
      });
    }

    //validate user password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.send({
        message: "Invalid password",
        success: false,
        statuscode: 400,
      });
    }
    // create a jwt and send it with data
    // this jwt function will keep track of session timeout for a perticular user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Login the user
    res.send({
      message: "User Login Success",
      success: true,
      statuscode: 200,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      statuscode: error.status,
    });
  }
});

// =================================================================================================================================
// Protected routes (protected routes are for implementing autorisations)
// we will protect the routes with the help of the middlewares
// Get Routes
// getting current user with the help of jwt token and authorizing
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    // getting the user based on jwt token from the database
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      data: user,
      statuscode: 200,
      message: "User Fetched successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
