const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  noOfPeople: {
    type: Number,
    required: true,
  },
  roomNo: [
    {
      type: Number,
      required: true,
    },
  ],
  unAvailability: [
    {
      roomNo: {
        type: String,
        unique: true,
      },
      date: [
        {
          type: Date,
          required: false,
          unique: false,
        },
      ],
    },
  ],
  amenities: [
    {
      type: String,
    },
  ],
  details: [
    {
      sqfeet: {
        type: Number,
      },
      noOfBeds: {
        type: Number,
      },
      balcony: {
        type: Boolean,
        default: false,
      },
      balcony: {
        type: Boolean,
        default: false,
      },
      gardenView: {
        type: Boolean,
        default: false,
      },
      landmarkView: {
        type: Boolean,
        default: false,
      },
      riverView: {
        type: Boolean,
        default: false,
      },
      bathroom: {
        type: Boolean,
        default: false,
      },
      tv: {
        type: Boolean,
        default: false,
      },
      wifi: {
        type: Boolean,
        default: false,
      },
    },
  ],
  // facilities: {
  //   name: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
