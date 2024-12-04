import { Router } from "express";
import { prisma } from "..";

export const usersRouter = Router();

usersRouter.post("", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.json(user);

})


usersRouter.get("", async (req, res) => {
  res.json('users app');

})