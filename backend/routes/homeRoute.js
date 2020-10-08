const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "I'm Home route of this app" });
});

module.exports = router;
