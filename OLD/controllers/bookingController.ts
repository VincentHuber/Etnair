import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const tokenSecret = process.env.JWT_SECRET as string;
const bookingsPrisma = new PrismaClient().bookings;
const userPrisma = new PrismaClient().user;
const adsPrisma = new PrismaClient().ads;


//Route pour créer une réservation
export const createBooking = async (req: Request, res: Response) => {
  try {
    //Vérifie si les champs sont vides
    const {
      start_date,
      end_date,
      adId
    } = req.body;

    if (
      !start_date ||
      !end_date
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

    // Vérifie que la réservation existe
    const existingAd = await adsPrisma.findUnique({where : {id: adId}})
    if (!existingAd){
      res.status(404).json({error : "Réservation introuvable"})
      return;
    }

    // Mise à jour de l'utilisateur en se basant sur l'userId
    const newBooking = await bookingsPrisma.create({
      data: {
        start_date,
        end_date,
        adId: adId,
        tenantId: userId,
      },
    });

    res.status(200).json({ data: newBooking });
  } catch (error) {
    console.error("Erreur lors de la réservation :", error);
  }
};


//Route pour supprimer un booking
export const deleteBooking = async (req: Request, res: Response) => {
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

    const { bookingId } = req.body;

    // Recherche de la réservation
    const existingBooking = await bookingsPrisma.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      res.status(404).json({ error: "Réservation introuvable" });
      return;
    }

    // Vérification que l'utilisateur est bien le propriétaire de l'annonce
    if (existingBooking.tenantId !== userId) {
      res
        .status(403)
        .json({ error: "Vous n'êtes pas autorisé à supprimer cette réservation" });
      return;
    }

    // Suppression de la réservation
    await bookingsPrisma.delete({
      where: { id: bookingId },
    });

    res.status(200).json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation:", error);
  }
};
