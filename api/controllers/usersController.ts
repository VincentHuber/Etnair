import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const bcrypt = require("bcrypt");
const tokenSecret = process.env.JWT_SECRET as string;
const userPrisma = new PrismaClient().user;

//Route pour trouver tous les users
export const getAllUsers = async (req: Request, res: Response) => {
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
    console.log("Body reçu :", req.body);

    //Verifie si les champs sont vides
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ error: "Email et mot de passe sont requis" });
      return;
    }

    //Vérifie le tokenSecret
    if (!tokenSecret) {
      res.status(500).json({ error: "Clé secrète manquante pour le token" });
      return;
    }
    // Vérifie si l'email/Nickname existe déjà
    const existingUser = await userPrisma.findFirst({
      where: {
        OR: [{ email: req.body.email }, { nickname: req.body.nickname }],
      },
    });

    if (existingUser) {
      if (existingUser.email === req.body.email) {
        res.status(400).json({ result: false, error: "Email déjà utilisé" });
        return;
      }
      if (existingUser.nickname === req.body.nickname) {
        res.status(400).json({ result: false, error: "Nickname déjà utilisé" });
        return;
      }
    }

    //Hashe le mdp
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    //Créer un user
    const newUser = await userPrisma.create({
      data: {
        nickname: req.body.nickname,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture,
        host_arrived: false,
      },
    });

    //Création du token
    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      tokenSecret,
      { expiresIn: "1h" }
    );

    //Renvoie toutes les infos de l'user
    res.status(200).json({
      data: {
        nickname: newUser.nickname,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        token: token,
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

    //Vérifie le tokenSecret
    if (!tokenSecret) {
      res.status(500).json({ error: "Clé secrète manquante pour le token" });
      return;
    }
    // Vérifie si l'utilisateur existe
    const existingUser = await userPrisma.findFirst({
      where: { email: req.body.email },
    });

    if (!existingUser) {
      res.status(400).json({ error: "Utilisateur non trouvé" });
      return;
    }

    // Vérifie si le mot de passe est correct
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(400).json({ error: "Mot de passe incorrect" });
      return;
    }

    //Création du token
    const token = jwt.sign(
      {
        userId: existingUser.id,
      },
      tokenSecret,
      { expiresIn: "1h" }
    );

    // Retourne les informations si tout est valide
    res.status(200).json({
      result: true,
      email: existingUser.email,
      nickname: existingUser.nickname,
      token: token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
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
