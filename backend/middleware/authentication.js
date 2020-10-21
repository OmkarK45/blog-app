const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Auth Token not found." });
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.json({ msg: "Token is invalid." });
  }
}
module.exports = authentication;
