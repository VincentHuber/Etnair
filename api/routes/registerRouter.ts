import { Router } from "express";
import { registerUser } from "../controllers/registerController";

const loginRouter: Router = Router();

loginRouter.post("/register", registerUser);
loginRouter.post("/login", registerUser);

export default loginRouter;