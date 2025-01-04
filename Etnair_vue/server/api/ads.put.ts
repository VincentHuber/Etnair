import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const tokenSecret = process.env.JWT_SECRET as string;
const adsPrisma = new PrismaClient().ads;

// Route pour mettre à jour l'annonce
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Vérifie la présence du tokenSecret
    if (!tokenSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: "Clé secrète manquante pour le token",
      });
    }

    // Récupération du token depuis le header
    const headers = getRequestHeaders(event);
    const authHeader = headers["authorization"];

    if (!authHeader) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token d'authentification manquant",
      });
    }

    //Extrait et décode le token
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);

    // Extraction de l'userId du token
    const userId = (decodedToken as { userId: string }).userId;

    const {
      adId,
      title,
      description,
      street_adress,
      city,
      zipcode,
      price,
      number_of_guests,
      number_of_rooms,
      size,
      bookable_dates,
      pictures,
    } = body;

    // Recherche de l'annonce
    const existingAd = await adsPrisma.findUnique({
      where: { id: adId },
    });

    if (!existingAd) {
      throw createError({
        statusCode: 404,
        statusMessage: "Annonce introuvable",
      });
    }

    // Vérification que l'utilisateur est bien le propriétaire de l'annonce
    if (existingAd.renterId !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: "Vous n'êtes pas autorisé à modifier cette annonce",
      });
    }

    // Mise à jour de l'annonce
    const updatedAd = await adsPrisma.update({
      where: { id: adId },
      data: {
        title,
        description,
        street_adress,
        city,
        zipcode,
        price,
        number_of_guests,
        number_of_rooms,
        size,
        bookable_dates,
        pictures,
      },
    });

    return {
      data: {
        result: true,
        updatedAd,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'annonce :", error);
    throw createError({
      statusCode: 500,
      statusMessage:
        "Une erreur est survenue lors de la mise à jour de l'annonce",
    });
  }
});
