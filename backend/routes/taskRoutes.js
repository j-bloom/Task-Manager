import express from "express";
import { Task } from "../models/taskModel.js";

const router = express.Router();

// Routes to Get all tasks
router.get("/", async (request, response) => {
  try {
    const tasks = await Task.find({});
    return response.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Routes to Get a single task
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const task = await Task.findById(id);

    return response.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Routes to save a new task
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.plannedDateToComplete
    ) {
      return response
        .status(400)
        .send({ message: "Please provide a title and description" });
    }
    const newTask = {
      title: request.body.title,
      description: request.body.description,
      plannedDateToComplete: request.body.plannedDateToComplete,
      completed: request.body.completed,
    };

    const task = await Task.create(newTask);

    return response.status(201).send(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Routes to update a task
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.plannedDateToComplete
    ) {
      return response.status(400).send({
        message:
          "Please provide a title, description, and estimated date to complete",
      });
    }

    const { id } = request.params;

    const result = await Task.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }

    return response.status(200).send({ message: "Task successfully updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Routes to delete a task
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Task.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }
    return response.status(200).send({ message: "Task successfully deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
