const Hotel = require("../models/hotel.model.js");
const multer = require("multer");

class HotelController {
  async createHotel(req, res) {
    console.log(req.body);
    try {
      const {
        name,
        address,
        description,
        price,
        facilities,
        city,
        time,
        type,
        images,
        distance,
        features,
      } = req.body;

      const hotel = new Hotel({
        name,
        address,
        description,
        price,
        city,
        time,
        type,
        distance,
        facilities,
        features,
        images,
      });

      await hotel.save();

      res.status(201).json({
        message: "Hotel created successfully",
        hotel,
      });
    } catch (error) {
      console.error("Error creating hotel:", error);
      res.status(500).json({
        error: "Failed to create hotel",
      });
    }
  }

  async deleteHotel(req, res) {
    try {
      const { hotelId } = req.params;
      const hotel = await Hotel.findByIdAndDelete(hotelId);
      if (!hotel) {
        return res.status(404).json({
          error: "Hotel not found",
        });
      }
      res.status(200).json({
        message: "Hotel deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to delete hotel",
      });
    }
  }
  async getAllHotels(req, res) {
    try {
      const { city, minPrice, maxPrice, page } = req.query;
      const query = {};
      if (city) {
        query.city = city;
      }

      if (minPrice && maxPrice) {
        query.price = {
          $gte: parseInt(minPrice),
          $lte: parseInt(maxPrice),
        };
      }

      const itemsPerPage = 8;
      const currentPage = parseInt(page) || 1;
      const totalItems = await Hotel.countDocuments(query);
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;

      const hotels = await Hotel.find(query)
        .skip(startIndex)
        .limit(itemsPerPage);

      res.status(200).json({
        hotels,
        currentPage,
        totalPages,
        totalItems,
      });
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).json({
        error: "Failed to fetch hotels",
      });
    }
  }

  async getHotelById(req, res) {
    const { hotelId } = req.params;
    try {
      const hotel = await Hotel.findById(hotelId).populate("rooms");
      console.log(hotel);
      if (!hotel) {
        res.status(404).json({
          error: "Hotel not found",
        });
        return;
      }
      res.status(200).json(hotel);
    } catch (error) {
      console.error("Error fetching hotel:", error);
      res.status(500).json({
        error: "Failed to fetch hotel",
      });
    }
  }

  async updateHotel(req, res) {
    const { hotelId } = req.params;

    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, req.body, {
        new: true,
      });

      console.log(updatedHotel, "up");
      if (!updatedHotel) {
        res.status(404).json({
          error: "Hotel not found",
        });
        return;
      }
      res.status(200).json(updatedHotel);
    } catch (error) {
      console.error("Error updating hotel:", error);
      res.status(500).json({
        error: "Failed to update hotel",
      });
    }
  }
}

module.exports = HotelController;
