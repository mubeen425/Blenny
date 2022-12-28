const mongoose = require("mongoose");
const nftSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      data: Buffer,
     contentType: String,
    },
    isBuy:{
      type: Boolean,
    },
    owner: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("NFTs", nftSchema);

// const mongoose = require("mongoose");

// const imgSchema = new mongoose.Schema({
//   name: String,
//   img: {
//     data: Buffer,
//     contentType: String,
//   },
// });

// module.exports = ImageModel = mongoose.model("Image", imgSchema);