import { Router } from "express";
import { loginUser, register } from "../controllers/authController";

const authRouter: Router = Router();

authRouter.post("/register", register);
authRouter.post("/login", loginUser);

export default authRouter;