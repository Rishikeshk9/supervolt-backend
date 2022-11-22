const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    wheels: {
      type: String,
    },
    charger: {
      type: String,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    battery: {
      type: String,
    },

    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
