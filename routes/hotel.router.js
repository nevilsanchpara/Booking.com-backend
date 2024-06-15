const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const HotelController = require("../controllers/hotel.controller.js");
const hotelController = new HotelController();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/images");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split(".").pop();
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only JPEG, PNG files are allowed."),
        false
      );
    }
  },
}).array("images", 5);

router.post("/", hotelController.createHotel);
router.get("/", hotelController.getAllHotels);
router.get("/:hotelId", hotelController.getHotelById);
router.put("/:hotelId", hotelController.updateHotel);
router.delete("/:hotelId", hotelController.deleteHotel);

module.exports = router;
