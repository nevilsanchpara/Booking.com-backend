const Room = require("../models/room.model.js");
const Hotel = require("../models/hotel.model.js");

class RoomController {
  async createRoom(req, res) {
    try {
      const {
        hotel,
        type,
        name,
        price,
        roomNo,
        amenities,
        noOfPeople,
        images,
        details,
      } = req.body;

      const unAvailability = roomNo.map((roomNo) => ({
        roomNo,
      }));

      console.log(unAvailability);

      const newRoom = new Room({
        hotel,
        type,
        name,
        price,
        roomNo,
        amenities,
        noOfPeople,
        unAvailability,
        details,
        images,
      });

      await Hotel.findByIdAndUpdate(
        hotel,
        { $push: { rooms: newRoom._id } },
        { new: true }
      );

      const getHotel = await Hotel.findById(hotel);
      if (getHotel.price === 0 || getHotel.price > price) {
        await Hotel.findByIdAndUpdate(hotel, { price: price }, { new: true });
      }
      const savedRoom = await newRoom.save();
      res.status(201).json(savedRoom);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get all rooms
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get a single room
  async getRoom(req, res) {
    try {
      const room = await Room.findById(req.params.roomId);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.json(room);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update a room
  async updateRoom(req, res) {
    try {
      console.log(req.params.roomId, req.body);
      const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, {
        new: true,
      });
      console.log(room);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.json(room);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  // Delete a room
  async deleteRoom(req, res) {
    try {
      const room = await Room.findById(req.params.roomId);
      console.log(room);
      await Room.findByIdAndDelete(req.params.roomId);
      console.log(room.hotel);
      const hotel = await Hotel.findByIdAndUpdate(
        room.hotel,
        { $pull: { rooms: req.params.roomId } },
        { new: true }
      );
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.json({ message: "Room deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getRoomsByHotel(req, res) {
    try {
      const hotel = await Hotel.findById(req.params.hotelId).populate("rooms");

      res.json(hotel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = RoomController;
