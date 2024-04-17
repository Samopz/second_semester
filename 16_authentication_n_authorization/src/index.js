import express from "express";
import dotenv from "dotenv";
import authorRoute from "./routes/author.route.js";
import userRoute from "./routes/users.route.js";
import { authorMiddleware } from "./middleware/author.middleware.js";

dotenv.config(); // Load .env file

const app = express();
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

// mongoose.connect(MONGO_URL).then(() => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

export default app;