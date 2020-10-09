const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {});

router.get("/register", (req, res) => {
  res.json({
    msg: "Registration route",
  });
});

router.post("/register", async (req, res) => {
  try {
    const { username, name, email, password, avatar, socialMedia } = req.body;

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
