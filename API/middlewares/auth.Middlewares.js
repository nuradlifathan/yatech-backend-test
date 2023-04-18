const { verifyToken } = require("../lib/jwt");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "User unauthorized ! please check your token" });
  }

  try {
    const user = verifyToken(token);

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden access" });
  }
};

module.exports = authToken;
