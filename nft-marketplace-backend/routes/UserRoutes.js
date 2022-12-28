// import express from "express";
const express = require("express");
// import userModel from "../models/userModel";
// import USERS from "../models/userModel";
const USERS = require("../models/userModel");
const multer = require("multer");
const Userrouter = express.Router();
const fs = require("fs");

// login post
Userrouter.post("/login", async (req, res) => {
  const { username, address, balance } = req.body;
  let ExistingUsers;
  try {
    ExistingUsers = await USERS.findOne({ address });
  } catch (error) {
    return console.log(error);
  }
  let user;
  if (ExistingUsers) {
    // Set the current balance
    ExistingUsers.update({ address: address }, { $set: { balance: balance } });
    return res.status(200).json({ user });
  }
  user = new USERS({
    address,
    balance,
    username
  });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

Userrouter.put(
  "/update",
  upload.any([
    { name: "coverImage", maxCount: 1 },
    { name: "profileImage", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log("request data ", req.body, req.files);
      const updateData = {
        username: req.body.username,
        bio: req.body.bio,
        email: req.body.email,
        coverImage: {
          data: fs.readFileSync("uploads/" + req.files[0].filename),
          contentType: "image/png"
        },
        profileImage: {
          data: fs.readFileSync("uploads/" + req.files[1].filename),
          contentType: "image/png"
        },
        links: {
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          site: req.body.site
        }
      };
      console.log(updateData);
      const res = await USERS.findOneAndUpdate(
        {
          address: req.body.address
        },
        updateData
      );
      console.log("res", res);
      res.status(200).json({
        message: "User updated successfully"
      });
    } catch (error) {
      console.log("error: ", error);
      res.json(error);
    }
  }
);
// Get Particular User by Address
Userrouter.get("/profile/:address", async (req, res) => {
  const address = req.params.address;
  // console.log(address);
  let user;
  try {
    user = await USERS.findOne({ address: address });
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, message: "Error in try catch" });
  }
  if (!user) {
    return res.status(404).json({ message: "Ueer Not found " });
  }
  return res.status(200).json({ user: user });
});

// get all
Userrouter.get("/getAll", async (req, res) => {
  let user;
  try {
    user = await USERS.find();
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, message: "Error in try catch" });
  }
  if (!user) {
    return res.status(404).json({ message: "Ueer Not found " });
  }
  return res.status(200).json({ user: user });
});

Userrouter.delete("/deleteAll", async (req, res) => {
  // const address = req.params.address;
  // // console.log(address);
  let user;
  try {
    user = await USERS.deleteMany({});
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, message: "Error in try catch" });
  }
  user = await USERS.find();
  // if (!user) {
  //   return res.status(404).json({ message: "Ueer Not found " });
  // }
  return res.status(200).json({ user: user });
});

module.exports = Userrouter;
