const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

  
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;