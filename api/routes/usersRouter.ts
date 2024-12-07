import { Router } from "express";
import { createUser, authenticateUser, deleteUser, getUserByToken, updateUser } from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/", getUserByToken);
usersRouter.post("/create", createUser);
usersRouter.post("/auth", authenticateUser)
usersRouter.put("/:token", updateUser)
usersRouter.delete("/:token", deleteUser);

export default usersRouter;