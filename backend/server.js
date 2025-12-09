require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// MONGO DB CONNECTION
// ----------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

// ----------------------
// ROUTES
// ----------------------
app.use("/api/tasks", taskRoutes);

// ----------------------
// SERVER START
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
