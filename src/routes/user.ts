import UserController from "@controllers/UserController";
import { Router } from "express";
import { isAuthenticated } from "src/middlewares/isAuthenticated";

const userRoutes = Router();

userRoutes.get("/", isAuthenticated, UserController.index);
userRoutes.get("/refresh-data", isAuthenticated, UserController.refreshData);
userRoutes.post("/", isAuthenticated, UserController.create);

export { userRoutes };
