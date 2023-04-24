const jwt = require("jsonwebtoken");

// authorization for the protected routes
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(400).send({ success: false, message: error });
  }
};
