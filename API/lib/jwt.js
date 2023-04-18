const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.accessTokenSecret;
const refreshTokenSecret = process.env.refreshTokenSecret;
const refreshTokens = new Set();

const signToken = (payload) => {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, accessTokenSecret);
};

// Function to generate a refresh token
const refreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret);
  refreshTokens.add(refreshToken); // Add refresh token to the Set
  return refreshToken;
};

module.exports = {
  signToken,
  verifyToken,
  refreshToken,
  refreshTokenSecret,
  refreshTokens,
};
