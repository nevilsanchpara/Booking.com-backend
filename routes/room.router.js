const express = require("express");
const multer = require("multer");
const router = express.Router();
const RoomController = require("../controllers/room.controller.js");

const roomController = new RoomController();

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

router.post("/", roomController.createRoom);
router.get("/", roomController.getAllRooms);
router.get("/:roomId", roomController.getRoom);
router.put("/:roomId", roomController.updateRoom);
router.delete("/:roomId", roomController.deleteRoom);
router.get("/hotel/:hotelId", roomController.getRoomsByHotel);

module.exports = router;
