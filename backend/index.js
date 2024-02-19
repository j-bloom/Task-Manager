import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Task } from "./models/taskModel.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

// Create a new instance of the express app
const app = express();

// Middleware to allow parsing of request
app.use(express.json());

// Middleware to allow cross origin requests
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Hello World! Welcome to the server!");
});

app.use("/tasks", taskRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
