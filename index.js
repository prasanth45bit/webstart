require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize, User, DogHistory } = require("./models");
const dogs = require("./dogs"); 
const multer = require("multer");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("DB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the WebStart");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });



app.get("/getDogHistory", async (req, res) => {
  user_id = req.query;
  try {
    const users = await DogHistory.findAll({
      where:{
        user_id:user_id,
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post("/signup", async (req, res) => {
  try {
    console.log("Request body:", req.body); 

    const { name, email, password, phone_number } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newUser = await User.create({ name, email, password, phone_number });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup error:", error); // Logs full error
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

app.put("/edit-profile/:id", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { id } = req.params; 
    const { username,  phone_number } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({
      username: username || user.username,
      phone_number: phone_number || user.phone_number,
    });

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ where: { email, password } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post("/check-dog", upload.single("image"), async (req, res) => {
  try {
    console.log("yes")
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Dummy user_id (replace with real user authentication)
    const user_id = req.body.user_id || 1; // Ensure user_id is sent in the request

    const randomIndex = Math.floor(Math.random() * dogs.length);
    const randomDog = dogs[randomIndex]; // Get a random dog

    const newHistory = await DogHistory.create({
      breed: randomDog.breed,
      age: randomDog.age,
      color: randomDog.color,
      user_id: user_id,
      weight: randomDog.health.weight,
      vaccinated: randomDog.health.vaccinated,
      neutered: randomDog.health.neutered,
      image_path: req.file.path, // Save the uploaded image path
    });

    return res.json({ message: "Dog detected and saved", dog: newHistory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
