import { Router } from "express";
import { createUser, authenticateUser, deleteUser, getAllUsers, updateUser } from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/create", createUser);
usersRouter.post("/auth", authenticateUser)
usersRouter.put("/update", updateUser)
usersRouter.delete("/delete", deleteUser);

export default usersRouter;