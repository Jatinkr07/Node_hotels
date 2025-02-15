const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../JWT");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data saved!");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: "Internal server error!" });
  }
});

//get
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched successfully!");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: "Internal server error!" });
  }
});

//worktype

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
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

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person is not found" });
    }

    console.log("Data updated!");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: "Internal server error!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person is not found" });
    } else {
      console.log("Data Deleted!");
      res.status(200).json({ message: "person deleted successfully!" });
    }
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: "Internal server error!" });
  }
});

module.exports = router;
