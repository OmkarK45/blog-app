require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const homeRoute = require("./routes/homeRoute");
const blogRoute = require("./routes/blogRoute");
const authRoute = require("./routes/authRoute");
const app = express();

// Express setup
app.use(
  bodyParser.urlencoded({ extended: false }, { useUnifiedTopology: true })
);
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(cors());
app.use(morgan("tiny"));
// Routes
app.use("/", homeRoute);
app.use("/blogs", blogRoute);
app.use("/user", authRoute);

// DB Configuration
mongoose.connect(
  process.env.DB_URI_LOCAL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to local database.");
  }
);

// Express server Bootup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server has started on", `https://localhost:${PORT}`);
});
