import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const tokenSecret = process.env.JWT_SECRET as string;
const userPrisma = new PrismaClient().user;
const adsPrisma = new PrismaClient().ads;

// Route pour créer une annonce
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Vérifie si les champs sont vides
    const {
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
      features,
    } = body;

    if (
      !title ||
      !description ||
      !street_adress ||
      !city ||
      !zipcode ||
      !number_of_guests ||
      !number_of_rooms ||
      !size ||
      !price ||
      !bookable_dates ||
      !pictures
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Certains champs ne sont pas remplis",
      });
    }

    // Vérifie le tokenSecret
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

    // Vérifie si l'utilisateur existe
    const renter = await userPrisma.findUnique({ where: { id: userId } });
    if (!renter) {
      throw createError({
        statusCode: 404,
        statusMessage: "Utilisateur introuvable",
      });
    }

    // Création de l'annonce
    const newAd = await adsPrisma.create({
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
        features,
        renterId: userId,
      },
    });

    // Réponse structurée au client
    return {
      data: {
        title: newAd.title,
        city: newAd.city,
        zipcode: newAd.zipcode,
        street_adress:newAd.street_adress,
        pictures: newAd.pictures,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue lors de la création de l'annonce",
    });
  }
});
