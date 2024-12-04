import { Router } from "express";
//import { prisma } from "..";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/", createUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;