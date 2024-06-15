const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false },
    photo: { type: String, required: false },
    type: { type: String, required: true },
    nickName: { type: String, required: false },
    phoneNo: { type: Number, required: false },
    dob: { type: Date, required: false },
    nationality: { type: String, required: false },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    address: { type: String, required: false },
    emailVerified: { type: Boolean, default: false },
    OTP: { type: Number, required: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    if (this.password) {
      const hashedPassword = bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
