const router = require("express").Router();
const NFTs = require("../models/nftModel");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/createNft", upload.single("nftImage"), (req, res) => {
  console.log(req.body);
  const saveImage = NFTs({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png"
    },
    isBuy: req.body.isBuy,
    owner: req.body.owner,
    category: req.body.category
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send("image is saved");
});

//update item
router.put("/createNft/:id", async (req, res) => {
  try {
    //find the item by its id and update it
    // NFTs.findByIdAndUpdate()
    const updateItem = await NFTs.findByIdAndUpdate(req.params.id, {
      isBuy: req.body.isBuy,
      owner: req.body.owner
    });
    res.status(200).json(updateItem);
  } catch (err) {
    res.json(err);
  }
});

router.post("/getNft", async (req, res, next) => {
  try {
    const nfts = await NFTs.find(req.body);
    // console.log("nfts: " + nfts);
    if (!nfts) res.status(400).json({ msg: "No data found" });
    res.status(200).json(nfts);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.get("/getNft/:id", async (req, res, next) => {
  try {
    console.log(req.params);
    const nft = await NFTs.findById(req.params.id);
    // console.log("nfts: " + nfts);
    if (!nft) res.status(400).json({ msg: "No data found" });
    res.status(200).json(nft);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
