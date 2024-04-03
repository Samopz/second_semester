import express from "express";
import dotenv from "dotenv"; 
import mongoose from "mongoose"; 
import authorRoute from "./src/routes/author.route.js";
import userRoute from "./src/routes/users.route.js";
import { authorMiddleware } from "./src/middleware/author.middleware.js";

dotenv.config(); // Load .env file

const app = express(); 
const MONGO_URL = process.env.MONGO_URL; 
const PORT = process.env.PORT; 
app.use(express.json()); 

// Routes
app.use("/author", authorRoute);
app.use("/users", userRoute);
app.use(authorMiddleware);

// Import/catch all routes
app.all("*", (req, res) => { 
  res.status(404);
  res.json({
    message: "Not found",
  });
}); 

mongoose.connect(MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
