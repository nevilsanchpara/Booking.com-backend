const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking.controller.js");
const VerifyToken = require("../middleware/VerifyToken.js");
const bookingController = new BookingController();

// Route for creating a new booking and processing payment
router.post("/", bookingController.cBooking);
router.post("/verifyPayment", bookingController.verifyPayment);

// Route for retrieving a specific booking
// router.get("/:bookingId", bookingController.getBookingById);

// Route for canceling a booking
// router.delete("/:bookingId", bookingController.cancelBooking);

module.exports = router;
