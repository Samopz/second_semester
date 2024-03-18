import { Router } from "express";
import * as authorController from "../controllers/author.controller.js";
import { generateMiddleWare } from "../middleware/route.middleware.js";
import {
  loginSchema,
  registerSchema,
} from "../validation/author.validation.js";

const authorRoute = Router();

authorRoute.post(
  "/login",
  generateMiddleWare(loginSchema),
  authorController.login
);
authorRoute.post(
  "/register",
  generateMiddleWare(registerSchema),
  authorController.register
);

export default authorRoute;
