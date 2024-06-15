const Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async getHotels() {
      try {
        const posts = await Hotel.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
