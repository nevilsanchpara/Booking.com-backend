const express = require("express");
const { connectToDatabase } = require("./db/db");
const bookingRoutes = require("./routes/booking.router");
const hotelRoutes = require("./routes/hotel.router");
const roomRoutes = require("./routes/room.router");
const userRoutes = require("./routes/user.router");
const cors = require("cors");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/payment", bookingRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT || 5000, () => {
  connectToDatabase();
  console.log(`Server is running on port ${process.env.PORT}`);
});
