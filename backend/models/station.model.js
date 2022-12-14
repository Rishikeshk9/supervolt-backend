const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
   
    mobile: {
      type: String,
    },
    mobile2: {
      type: String,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
