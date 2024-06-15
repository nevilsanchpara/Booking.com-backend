const Booking = require("../models/booking.model.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/Helpers.js");

class UserController {
  async bookingByUserId(req, res) {
    try {
      const { _id } = req.decodedData;
      console.log(_id);

      const booking = await Booking.find({
        userId: _id,
      }).populate("hotelId");
      if (!booking) {
        return res.status(404).json({ data: [] });
      }
      res.status(200).json({ data: booking });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
  async signup(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(409)
          .json({ error: "User with this email already exists" });
      }
      const newUser = await User.create({ type: "email", email, password });
      const token = generateToken({ _id: newUser });
      res.status(201).json({ data: newUser, token: token });
    } catch (error) {
      res.status(500).json({ error: "Failed to create a new user" });
    }
  }

  async googleAuth(req, res) {
    try {
      console.log("hiii");
      const { type, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user != null) {
        const token = generateToken({ _id: user._id });
        console.log(token);
        return res.status(200).json({ data: user, token: token });
      }
      const newUser = await User.create({ type: "google", email, password });
      const token = generateToken({ _id: newUser._id });
      res.status(201).json({ data: newUser, token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create a new user" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = generateToken({ _id: user._id });
      console.log(token);
      res.status(200).json({ token: token, data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to authenticate user" });
    }
  }

  async resetPassword(req, res) {}

  async available(req, res) {
    const { email } = req.body;
    const user = await User.find({ email });
    console.log(user);
    if (user.length === 0) {
      return res.status(404).send("User does not found!!");
    } else {
      res.status(200).send(user);
    }
  }

  async getUser(req, res) {
    const decodedData = req.decodedData;
    const user = await User.findById(decodedData._id);
    if (!user) {
      return res.status(404).send("User does not found!!");
    } else {
      res.status(200).send(user);
    }
  }

  async verifyEmail(req, res) {
    // Logic for email verification
  }

  async updateUser(req, res) {
    try {
      const decodedData = req.decodedData;
      const user = await User.findOneAndUpdate(
        { _id: decodedData._id },
        {
          new: true,
        }
      );
      res.status(200).json(user);
    } catch (error) {
      // Handle any errors
      res.status(500).json({ error: "Failed to update user" });
    }
  }
}

module.exports = UserController;
