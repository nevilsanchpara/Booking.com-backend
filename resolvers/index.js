const roomResolvers = require("./room.resolver");
const hotelResolvers = require("./hotel.resolver");

module.exports = {
  Query: {
    ...roomResolvers.Query,
    ...hotelResolvers.Query,
  },
};
