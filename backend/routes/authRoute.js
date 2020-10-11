const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authentication = require("../middleware/authentication");

router.get("/login", (req, res) => {});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .json({ error: "Please make sure to enter all fields." })
      .status(400);

  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({
        msg: "Invalid Credentials. Please check again.",
      });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res
          .status(400)
          .json({ error: "Invalid Credentials. Please check again." });

      jwt.sign({ id: user._id }, process.env.JWT_SECRET, (err, token) => {
        if (err) throw err;
        res.json({
          token: token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      });
    });
  });
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authentication, async (req, res) => {
  const { username, socialMedia, _id, email, blogs } = await User.findById(
    req.user.id
  );

  res.json({
    username,
    socialMedia,
    _id,
    email,
    blogs,
  });
});

router.get("/register", (req, res) => {
  res.json({
    msg: "Registration route",
  });
});

router.post("/register", async (req, res) => {
  try {
    const { username, name, email, password, avatar, socialMedia } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "Please fill all the fields." });
    const result = await User.findOne({
      email: email,
    });

    if (result) {
      res
        .json({
          msg:
            "User already exist in database. Please try with a different email.",
        })
        .status(400);
    } else {
      const newUser = new User({
        username,
        name,
        email,
        password,
        avatar,
        socialMedia,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;

          newUser.password = hash;

          newUser.save().then((user) => {
            console.log("Registration succeed.");
            res.json({ msg: "User registered." }).status(200);
            // redirect user after registration.
          });
        });
      });
    }
  } catch (error) {
    res.json({ error: "Some Error occured." }).status(501);
  }
});

module.exports = router;
