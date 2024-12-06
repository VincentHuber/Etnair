import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const bcrypt = require("bcrypt");
const uid2 = require("uid2");

const userPrisma = new PrismaClient().user;

//getAllUsers
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUser = await userPrisma.findMany({});
    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e);
  }
};

//getUserById
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const allUser = await userPrisma.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e);
  }
};

// Route Signup
export const createUser = async (req: Request, res: Response) => {
  try {

    console.log("body:", req.body);
    //Verifie si les champs sont vides
    // if (!req.body.nickname || !req.body.email || !req.body.password) {
    //   return res.status(400).json({ error: "Un des champs est manquant ou vide" });
    // }

    // Vérifie si l'email/Nickname existe déjà
    // const existingUser = await userPrisma.findFirst({
    //   where: {
    //     OR: [
    //       { email: req.body.email },
    //       { nickname: req.body.nickname },
    //     ],
    //   },
    // });

    // if (existingUser) {
    //   if (existingUser.email === req.body.email) {
    //     return res.status(400).json({ result: false, error: "Email déjà utilisé" });
    //   }
    //   if (existingUser.nickname === req.body.nickname) {
    //     return res.status(400).json({ result: false, error: "Nickname déjà utilisé" });
    //   }
    // }

    //Hashe le mdp
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    //Créer un user
    const newUser = await userPrisma.create({
      data: {
        nickname: req.body.nickname,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture,
        token: uid2(32),
        host_arrived: false,
      },
    });

    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error("Erreur inconnue ou non capturée", error);
    res.status(500).json({ result: false, error: "Erreur interne du serveur" });
  }
};

//updateUser
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const allUser = await userPrisma.update({
      where: {
        id: parseInt(userId),
      },
      data: userData,
    });

    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e);
  }
};

//deleteUser
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const allUser = await userPrisma.delete({
      where: {
        id: parseInt(userId),
      },
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.log(e);
  }
};
