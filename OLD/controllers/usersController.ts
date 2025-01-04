import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET as string;
const userPrisma = new PrismaClient().user;

//Route pour trouver tous les users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userPrisma.findMany({
      include: {
        ads: true,
        bookings: true,
      },
    });

    // Vérification si des utilisateurs existent
    if (allUsers.length === 0) {
      res.status(404).json({ error: "Aucun utilisateur trouvé." });
      return;
    }

    res.status(200).json({ data: allUsers });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

//Route pour trouver les infos d'un user
export const getUser = async (req: Request, res: Response) => {
  try {
    // Récupération du token depuis le header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.json({ error: "Token manquant ou invalide" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // Décodage et validation du token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, tokenSecret);
    } catch (err) {
      res.status(400).json({ error: "Token invalide ou expiré" });
      return;
    }

    // Extraction de l'userId du token
    const userId = (decodedToken as { userId: number }).userId;

    const userInfo = await userPrisma.findFirst({
      where: { id: userId },
      include: {
        ads: true,
        bookings: true,
      },
    });

    if (!userInfo) {
      res.status(404).json({ error: "Utilisateur introuvable" });
      return;
    }
    res.status(200).json({ data: userInfo });
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur :", error);
  }
};

// Route pour mettre à jour son profil
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Récupération du token depuis le header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.json({ error: "Token manquant ou invalide" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // Décodage et validation du token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, tokenSecret);
    } catch (err) {
      res.status(400).json({ error: "Token invalide ou expiré" });
      return;
    }

    // Extraction de l'userId du token
    const userId = (decodedToken as { userId: number }).userId;

    // Mise à jour de l'utilisateur en se basant sur l'userId
    const updatedUser = await userPrisma.update({
      where: { id: userId },
      data: {
        nickname: req.body.nickname,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
      },
    });

    // Retour des données mises à jour
    res.status(200).json({
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
    // Récupération du token depuis le header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.json({ error: "Token manquant ou invalide" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // Décodage et validation du token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, tokenSecret);
    } catch (err) {
      res.status(400).json({ error: "Token invalide ou expiré" });
      return;
    }

    // Extraction de l'userId du token
    const userId = (decodedToken as { userId: number }).userId;

    await userPrisma.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
  }
};

//Route pour supprimer tous les users
// export const deleteAllUsers = async (req: Request, res: Response) => {
//   try {

//     await userPrisma.deleteMany();

//     return res.status(200).json({ message: "Tous les utilisateurs ont été supprimés." });
//   } catch (error) {
//     console.error("Erreur lors de la suppression des utilisateurs:", error);
//   }
// };
