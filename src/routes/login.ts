import LoginController from "@controllers/LoginController";
import { Router } from "express";

const loginRoutes = Router();

loginRoutes.post("/", LoginController.create);

export { loginRoutes };
