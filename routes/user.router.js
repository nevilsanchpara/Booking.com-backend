const express = require("express");
const UserController = require("../controllers/user.controller.js");
const VerifyToken = require("../middleware/VerifyToken.js");
const router = express.Router();
const userController = new UserController();

router.post("/signup", userController.signup);
router.get("/bookingByUserId", VerifyToken, userController.bookingByUserId);
router.post("/googleAuth", userController.googleAuth);
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
router.post("/available", userController.available);
router.get("/me", VerifyToken, userController.getUser);
router.get("/verifyEmail", userController.verifyEmail);
router.put("/update", VerifyToken, userController.updateUser);

module.exports = router;
