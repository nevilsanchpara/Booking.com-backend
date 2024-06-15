const jwt = require("jsonwebtoken");
const generateToken = (obj) => {
  const token = jwt.sign(obj, "nevilsaspara", {
    expiresIn: "5d",
  });
  return token;
};

module.exports = generateToken;
