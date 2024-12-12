import { Router } from "express";
import { loginUser, registerUser } from "../controllers/registerController";

const loginRouter: Router = Router();

loginRouter.post("/register", registerUser);
loginRouter.post("/login", loginUser);

export default loginRouter;