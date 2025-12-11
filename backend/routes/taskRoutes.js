const express = require("express");
const router = express.Router();
const Task = require("../my-express-app/Task");

const useMemory = !process.env.MONGO_URI;
const memory = [];

// CREATE Task
router.post("/", async (req, res) => {
  if (useMemory) {
    const now = new Date();
    const task = {
      _id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description || "",
      priority: req.body.priority || "low",
      dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
      completed: !!req.body.completed,
      createdAt: now,
      updatedAt: now,
    };
    memory.unshift(task);
    return res.status(201).json(task);
  }
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

// GET All Tasks
router.get("/", async (req, res) => {
  if (useMemory) {
    const tasks = [...memory].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    return res.json(tasks);
  }
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error loading tasks", error });
  }
});

// GET Task by ID
router.get("/:id", async (req, res) => {
  if (useMemory) {
    const task = memory.find((t) => t._id === req.params.id);
    return res.json(task || null);
  }
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
});

// UPDATE Task
router.put("/:id", async (req, res) => {
  if (useMemory) {
    const idx = memory.findIndex((t) => t._id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    const prev = memory[idx];
    const updated = {
      ...prev,
      ...req.body,
      updatedAt: new Date(),
    };
    memory[idx] = updated;
    return res.json(updated);
  }
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

// DELETE Task
router.delete("/:id", async (req, res) => {
  if (useMemory) {
    const lenBefore = memory.length;
    const after = memory.filter((t) => t._id !== req.params.id);
    memory.length = 0;
    after.forEach((t) => memory.push(t));
    return res.json({ message: "Task deleted", deleted: lenBefore !== memory.length });
  }
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

module.exports = router;
