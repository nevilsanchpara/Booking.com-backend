const Booking = require("../models/booking.model.js");
const moment = require("moment");
const User = require("../models/user.model.js");
const Room = require("../models/room.model.js");
const Razorpay = require("razorpay");
const stripe = require("stripe")(
  "sk_test_51NUYeFSHswC3EcrchPbHSJOMpAF32jiu4RREyySmUN59s5yo4CeYA4HWY0GriN9JnekFXq54rxD9u7QgYLd8AZo000aDIzc3Zx"
);

const razorpay = new Razorpay({
  key_id: "rzp_test_zL7ejbw9qqNnag",
  key_secret: "xFscIueWyacHbdrWiKZgtYT4",
});

class BookingController {
  async cBooking(req, res) {
    const {
      startDate,
      endDate,
      amount,
      hotelId,
      userId,
      roomData,
      rooms,
      hotelName,
    } = req.body;
    const data = [
      {
        amount: amount,
        quantity: rooms.length,
        currency: "usd",
        name: hotelName,
        price: amount,
      },
    ];

    const line_items = data?.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "https://booking-com-frontend.onrender.com/",
      cancel_url: "https://booking-com-frontend.onrender.com/",
      line_items,
    });

    const start = moment.utc(startDate, "DD-MM-YYYY").toDate();
    const end = moment.utc(endDate, "DD-MM-YYYY").toDate();
    const datesArray = [];
    let current = moment(start);
    while (current.isSameOrBefore(end)) {
      datesArray.push(current.toDate());
      current.add(1, "day");
    }
    const payment = new Booking({
      amount,
      hotelId,
      userId,
      rooms,
      status: "paid",
      startDate: start,
      endDate: end,
    });
    await payment.save();

    for (let i = 0; i < roomData.length; i++) {
      for (let j = 0; j < roomData[i].roomNo.length; j++) {
        await Room.updateOne(
          {
            _id: roomData[i]._id,
            "unAvailability.roomNo": roomData[i].roomNo[j],
          },
          {
            $push: {
              "unAvailability.$.date": { $each: datesArray },
            },
          }
        );
      }
    }

    res.json({
      id: session.id,
    });
  }

  async verifyPayment(req, res) {
    const {
      startDate,
      endDate,
      amount,
      paymentId,
      hotelId,
      userId,
      roomData,
      rooms,
    } = req.body;
    const captureResponse = await razorpay.payments.capture(
      paymentId,
      amount * 100,
      "INR"
    );

    const start = moment.utc(startDate, "DD-MM-YYYY").toDate();
    const end = moment.utc(endDate, "DD-MM-YYYY").toDate();
    const datesArray = [];
    let current = moment(start);
    while (current.isSameOrBefore(end)) {
      datesArray.push(current.toDate());
      current.add(1, "day");
    }

    if (captureResponse.status === "captured") {
      const payment = new Booking({
        amount,
        paymentId,
        hotelId,
        userId,
        rooms,
        status: "paid",
        startDate: start,
        endDate: end,
      });
      await payment.save();

      for (let i = 0; i < roomData.length; i++) {
        for (let j = 0; j < roomData[i].roomNo.length; j++) {
          await Room.updateOne(
            {
              _id: roomData[i]._id,
              "unAvailability.roomNo": roomData[i].roomNo[j],
            },
            {
              $push: {
                "unAvailability.$.date": { $each: datesArray },
              },
            }
          );
        }
      }
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  }
}

module.exports = BookingController;
