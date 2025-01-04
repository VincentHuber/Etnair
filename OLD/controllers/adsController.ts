import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const tokenSecret = process.env.JWT_SECRET as string;
const userPrisma = new PrismaClient().user;
const adsPrisma = new PrismaClient().ads;


//Route pour créer une annonce
export const createAd = async (req: Request, res: Response) => {
  try {
    //Vérifie si les champs sont vides
    const {
      title,
      description,
      address,
      nightly_price,
      bookable_dates,
      pictures,
    } = req.body;

    if (
      !title ||
      !description ||
      !address ||
      !nightly_price ||
      !bookable_dates ||
      !pictures
    ) {
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
      return;
    }

    // Mise à jour de l'utilisateur en se basant sur l'userId
    const newAd = await adsPrisma.create({
      data: {
        title,
        description,
        address,
        bookable_dates,
        nightly_price,
        pictures,
        renterId: userId,
      },
    });

    res.status(200).json({ data: newAd });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
  }
};

// Route pour mettre à jour l'annonce
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

    const {
      adId,
      title,
      description,
      address,
      nightly_price,
      bookable_dates,
      pictures,
    } = req.body;

    // Recherche de l'annonce
    const existingAd = await adsPrisma.findUnique({
      where: { id: adId },
    });

    if (!existingAd) {
      res.status(404).json({ error: "Annonce introuvable" });
      return;
    }

    // Vérification que l'utilisateur est bien le propriétaire de l'annonce
    if (existingAd.renterId !== userId) {
      res
        .status(403)
        .json({ error: "Vous n'êtes pas autorisé à modifier cette annonce" });
      return;
    }

    // Mise à jour de l'annonce
    const updatedAd = await adsPrisma.update({
      where: { id: adId },
      data: {
        title,
        description,
        address,
        nightly_price,
        bookable_dates,
        pictures,
      },
    });

    res.status(200).json({
      data: updatedAd,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'annonce :", error);
  }
};

//Route pour supprimer une annonce
export const deleteAd = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(400).json({ error: "Token manquant ou invalide" });
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

    const { adId } = req.body;

    // Recherche de l'annonce
    const existingAd = await adsPrisma.findUnique({
      where: { id: adId },
    });

    if (!existingAd) {
      res.status(404).json({ error: "Annonce introuvable" });
      return;
    }

    // Vérification que l'utilisateur est bien le propriétaire de l'annonce
    if (existingAd.renterId !== userId) {
      res
        .status(403)
        .json({ error: "Vous n'êtes pas autorisé à supprimer cette annonce" });
      return;
    }

    // Suppression de l'annonce
    await adsPrisma.delete({
      where: { id: adId },
    });

    res.status(200).json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'annonce:", error);
  }
};
