const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hotel",
    },
    amount: { type: Number, required: true },
    email: { type: String, required: false },
    status: { type: String, required: true },
    rooms: [{ type: String, required: true }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
