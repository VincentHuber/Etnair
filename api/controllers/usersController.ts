import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const bcrypt = require("bcrypt");
const tokenSecret = process.env.JWT_SECRET as string;

const userPrisma = new PrismaClient().user;

//getAllUsers
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUser = await userPrisma.findMany({

    })
    res.status(200).json({ data: { allUser } });
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "error" });
  }
};

//getUserById
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id
  try {
    if (!req.body.id) {
      res.status(400).json({ error: "id requis in param" });
      return;
    }

    const allUser = await userPrisma.findUnique({
      where: {
        id: parseInt(userId),
      }
    })
    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "error" });
  }
};

//createUser
// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const userData = req.body;
//     const allUser = await userPrisma.create({
//       data: userData
//     })
//     res.status(201).json({ data: allUser });
//   } catch (e) {
//     console.log(e)
//   }
// };

//updateUser
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  try {
    if (!req.body.id) {
      res.status(400).json({ error: "id not found" });
      return;
    }
    const existingUser = await userPrisma.findFirst({
      where: {
        OR: [
          { nickname: req.body.nickname },
          { email: req.body.email },
        ],
        NOT: {
          id: parseInt(userId),
        },
      },
    });

    if (existingUser) {
      if (existingUser.nickname === req.body.nickname) {
        res.status(400).json({ error: "Nickname already exists." });
        return;
      }
      if (existingUser.email === req.body.email) {
        res.status(400).json({ error: "Email already exists." });
        return;
      }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const allUser = await userPrisma.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        nickname: req.body.nickname,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture,
      },
    });
    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "error" });
  }
};

//deleteUser
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  try {
    if (!req.body.id) {
      res.status(400).json({ error: "id not found" });
      return;
    }
    const allUser = await userPrisma.delete({
      where: {
        id: parseInt(userId),
      }
    });
    res.status(200).json({ message: "user deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error" });
  }
}
