import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/getUser", getUser)
usersRouter.put("/update", updateUser)
usersRouter.delete("/delete", deleteUser);

export default usersRouter;