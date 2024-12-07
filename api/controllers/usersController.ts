import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const bcrypt = require("bcrypt");
const uid2 = require("uid2");

const userPrisma = new PrismaClient().user;

//Route pour trouver les infos d'un seul user
export const getUserByToken = async (req: Request, res: Response) => {
  try {
    const allUser = await userPrisma.findMany({});
    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e);
  }
};

// Route pour s'inscrire
export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("body:", req.body);

    //Verifie si les champs sont vides
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ error: "Email et mot de passe sont requis" });
      return;
    }

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

    res.status(201).json({
      data: {
        nickname: newUser.nickname,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        token: newUser.token,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
  }
};

// Route pour se connecter
export const authenticateUser = async (req: Request, res: Response) => {
  try {
    // Vérifie si les champs sont vides
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ error: "Email et mot de passe sont requis" });
      return;
    }

    // Recherche de l'utilisateur par email
    const existingUser = await userPrisma.findFirst({
      where: { email: req.body.email },
    });

    // Vérifie si l'utilisateur existe
    if (!existingUser) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    // Vérifie si le mot de passe est correct
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ error: "Mot de passe incorrect" });
      return;
    }

    // Retourne les informations si tout est valide
    res.status(200).json({
      result: true,
      email: existingUser.email,
      token: existingUser.token,
      nickname: existingUser.nickname,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }
};

// Route pour mettre à jour son profil
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userPrisma.update({
      where: {
        token: req.params.token,
      },
      data: {
        nickname: req.body.nickname,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
      },
    });

    res
      .status(200)
      .json({
        data: {
          nickname: updatedUser.nickname,
          email: updatedUser.email,
          profilePicture: updatedUser.profilePicture,
        },
      });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
  }
};

// Router pour supprimer son profil
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userPrisma.delete({
      where: {
        token: req.params.token,
      },
    });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
  }
};
