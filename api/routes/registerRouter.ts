import { Router } from "express";
import { connectionUser, registerUser } from "../controllers/registerController";

const loginRouter: Router = Router();

loginRouter.post("/register", registerUser);
loginRouter.post("/login", connectionUser);

export default loginRouter;