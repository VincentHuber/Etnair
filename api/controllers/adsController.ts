import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET as string;
const userPrisma = new PrismaClient().user;
const adsPrisma = new PrismaClient().ads;

//Route pour trouver toutes les annonces
export const getAllAds = async (req: Request, res: Response) => {
  try {
    const allAds = await adsPrisma.findMany({});
    res.status(200).json({ data: allAds });
  } catch (e) {
    console.log(e);
  }
};

//Route pour trouver toutes les annonces d'un user
export const getAds = async (req: Request, res: Response) => {
  try {
    const adsId = req.params.id;
    const allAds = await adsPrisma.findUnique({
      where: {
        id: parseInt(adsId),
      },
    });
    res.status(200).json({ data: allAds });
  } catch (e) {
    console.log(e);
  }
};

//Route pour créer une annonce
export const createAd = async (req: Request, res: Response) => {
  try {
    //Vérifie si les champs sont vides
    const { title, description, address, nightly_price, bookable_dates } = req.body;

    if (!title || !description || !address || !nightly_price || !bookable_dates) {
      res.status(400).json({ error: "Certains champs ne sont pas remplis" });
      return;
    }

    //Vérifie le tokenSecret
    if (!tokenSecret) {
      res.status(500).json({ error: "Clé secrète manquante pour le token" });
      return;
    }

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

     // Vérifie si l'utilisateur existe
     const renter = await userPrisma.findUnique({ where: { id: userId } });
     if (!renter) {
      res.status(404).json({ error: "Utilisateur introuvable" });
       return 
     }

    // Mise à jour de l'utilisateur en se basant sur l'userId
    const newAd = await adsPrisma.create({
      data: {
        title,
        description,
        address,
        bookable_dates,
        nightly_price,
        renterId: userId
      },
    });

    res.status(200).json({ data : newAd });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
  }
};

//Route pour mettre à jour l'annonce
export const updateAd = async (req: Request, res: Response) => {
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


//Route pour supprimer une annonce
export const deleteAd = async (req: Request, res: Response) => {
  try {
    const adsId = req.params.id;
    const allAds = await adsPrisma.delete({
      where: {
        id: parseInt(adsId),
      },
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.log(e);
  }
};
