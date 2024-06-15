const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  time: {
    checkIn: {
      required: false,
      type: Number,
    },
    checkOut: {
      required: false,
      type: Number,
    },
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
  distance: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  facilities: {
    petAllowed: {
      type: Boolean,
      default: false,
    },
    freeWifi: {
      type: Boolean,
      default: false,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    freeParking: {
      type: Boolean,
      default: false,
    },
    dailyHousekeeping: {
      type: Boolean,
      default: false,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    elevator: {
      type: Boolean,
      default: false,
    },
    bar: {
      type: Boolean,
      default: false,
    },
    swimmingPool: {
      type: Boolean,
      default: false,
    },
    garden: {
      type: Boolean,
      default: false,
    },
    acRooms: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  freeCancelation: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  features: [
    {
      type: String,
      default: null,
    },
  ],
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: false,
    },
  ],
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
