const Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");

module.exports = {
  Query: {
    async getRoom(_, { postId }) {
      try {
        const post = await Room.find();
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
