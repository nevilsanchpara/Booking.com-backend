const { gql } = require("apollo-server");

module.exports = gql`
  type Hotel {
    id: ID!
    name: String!
    location: String!
    rooms: [Room]!
  }

  type Room {
    id: ID!
    name: String!
    type: String!
    price: Float!
    hotel: Hotel!
  }

  type Query {
    getHotels: [Hotel]!
    getRooms: [Room]!
  }
`;
