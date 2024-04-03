import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authorMiddleware } from "../middleware/author.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const userRoute = Router();

userRoute.use(authorMiddleware);

userRoute.get("/", adminMiddleware, userController.getAllUsers);
// userRoute.get("/example", userController.getAllUsers);

export default userRoute;
