const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.json({
    msg: "Login Route",
  });
});

router.get("/register", (req, res) => {
  res.json({
    msg: "Registration route",
  });
});

module.exports = router;
