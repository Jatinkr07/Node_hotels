const express = require("express");
const router = express.Router();
const menuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new menuItem(data);

    const response = await newMenuItem.save();
    console.log("Data Saved successfully!");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: "Internal Server error!" });
  }
});

//get
router.get("/", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("Data fetched successfully!");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: "Internal server error!" });
  }
});

//dishtype
router.get("/:resName", async (req, res) => {
  try {
    const resName = req.params.resName;
    if (
      resName == "KFC" ||
      resName == "Punjabi Tadka" ||
      resName == "Food Buff"
    ) {
      const response = await menuItem.find({ restaurant: resName });
      console.log("response fetched!");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type request!" });
    }
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: "Internal server error!" });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updateMenuItem = req.body;
    const response = await menuItem.findByIdAndUpdate(itemId, updateMenuItem, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Item not Found" });
    }
    console.log("Data updated!");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: "Internal server error!" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const response = await menuItem.findByIdAndDelete(itemId);
    if (!response) {
      return res.status(404).json({ message: "Item not found in the menu!" });
    } else {
      console.log("Data deleted successfully!");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    req.status(505).json({ error: "Internal server error" });
  }
});

module.exports = router;
