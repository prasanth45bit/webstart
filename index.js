require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize, User } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("DB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the API aravidh");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
