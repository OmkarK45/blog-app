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
const helmet = require("helmet");
const app = express();

// Express setup
app.use(helmet());
app.use(helmet.xssFilter());
app.disable("x-powered-by");
app.use(
  bodyParser.urlencoded({ extended: false }, { useUnifiedTopology: true })
);
app.use(bodyParser.json());
app.use(methodOverride("_method"));

var corsOptions = {
  origin: "https://semicolon-blog.netlify.app",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(morgan("tiny"));
// Routes
app.use("/", homeRoute);
app.use("/blogs", blogRoute);
app.use("/user", authRoute);

// DB Configuration
mongoose.connect(
  process.env.DB_URI_ATLAS,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to Cloud database.");
  }
);

// Express server Bootup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server has started on", `https://localhost:${PORT}`);
});
