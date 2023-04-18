const express = require("express");
const authController = require("../controllers/auth.Controller");
const authToken = require("../middlewares/auth.Middlewares");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.get("/protected", authToken, authController.authProtected);

module.exports = router;
