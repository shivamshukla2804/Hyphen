require("dotenv").config();
const jwt = require("jsonwebtoken");

const getUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate or login" });
  }
  try {
    const data = jwt.verify(token, process.env.jwtkey);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate or login" });
  }
};

module.exports = getUser;
