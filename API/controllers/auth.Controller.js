const users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  signToken,
  refreshToken,
  refreshTokenSecret,
  refreshTokens,
} = require("../lib/jwt");

const authController = {
  register: async (req, res) => {
    try {
      // regist user data from request body
      const { username, password } = req.body;

      // Check if user already exists
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 5);

      // Create new user
      const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword,
      };
      users.push(newUser);

      res
        .status(201)
        .json({ message: "User registered successfully", data: newUser });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    try {
      // Get user data from request body
      const { username, password } = req.body;

      // Find user by username
      const user = users.find((user) => user.username === username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Compare password raw and hashed password
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      //   //   Generate access token
      const accessToken = signToken({ id: user.id });

      // Generate refresh token
      const refToken = refreshToken(user);

      return res.status(201).json({
        message: "Login success",
        data: user,
        accessToken: accessToken,
        refreshToken: refToken,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  refreshToken: (req, res) => {
    // Get refresh token from request body
    const { refreshToken } = req.body;

    // Check if refresh token is valid
    if (!refreshToken || !refreshTokens.has(refreshToken)) {
      // Use Set.has() to check if refresh token exists in the Set
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Verify refresh token and generate new access token
    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const accessToken = signToken(user);

      res.json({ accessToken });
    });
  },
  authProtected: (req, res) => {
    res.json({ message: "Access granted to this protected routes" });
  },
};

module.exports = authController;
