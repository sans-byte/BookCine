const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config(); //We use dotenv so that we can put those information in .env folder that we do not want to push to git or show to the world
const dbConfig = require("./congif/dbconfig");
const userRoutes = require("./routes/userRoutes");
const moviesRoutes = require("./routes/movieRoutes")
const theaterRoutes = require("./routes/theaterRoutes");

// for api/users is hitting userRoutes will be used
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/theater", theaterRoutes);

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server started on port ${port}`));
