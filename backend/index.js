require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const posts = [
  {
    title: "Post number 1",
    description: "I like dogs",
    username: "Omkar",
  },
  {
    title: "Post number 2",
    description: "I like cats",
    username: "Jim",
  },
  {
    title: "Post number 3",
    description: "I like bulldogs",
    username: "Tim",
  },
];

app.get("/", (req, res) => {
  res.json({ msg: "Hi Im home" });
});

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  // authentication logic
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
  res.json({ accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server has started on", `https://localhost:${PORT}`);
});
