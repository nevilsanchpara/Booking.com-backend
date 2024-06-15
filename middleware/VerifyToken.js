const jwt = require("jsonwebtoken");

function VerifyToken(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format" });
  }
  try {
    const token = authToken.split(" ")[1];
    const decodedData = jwt.verify(token, "nevilsaspara");
    req.decodedData = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Token is expired" });
  }
}

module.exports = VerifyToken;
