import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const tokenSecret = process.env.JWT_SECRET as string;

// Route pour créer une réservation
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validation des champs requis
    const { start_date, end_date, adId } = body;

    if (!start_date || !end_date || !adId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Certains champs ne sont pas remplis",
      });
    }

    // Validation des dates
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw createError({
        statusCode: 400,
        statusMessage: "Dates invalides",
      });
    }

    if (startDate >= endDate) {
      throw createError({
        statusCode: 400,
        statusMessage: "La date de début doit être antérieure à la date de fin",
      });
    }

    // Vérification du token JWT
    if (!tokenSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: "Clé secrète manquante pour le token",
      });
    }

    const headers = getRequestHeaders(event);
    const authHeader = headers["authorization"];

    if (!authHeader) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token d'authentification manquant",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);

    const userId = (decodedToken as { userId: string }).userId;

    // Vérification si l'utilisateur existe
    const renter = await prisma.user.findUnique({ where: { id: userId } });
    if (!renter) {
      throw createError({
        statusCode: 404,
        statusMessage: "Utilisateur introuvable",
      });
    }

    // Vérification si l'annonce existe
    const existingAd = await prisma.ads.findUnique({ where: { id: adId } });
    if (!existingAd) {
      throw createError({
        statusCode: 404,
        statusMessage: "Annonce introuvable",
      });
    }

    // Vérification des conflits de réservation
    const overlappingBooking = await prisma.bookings.findFirst({
      where: {
        adId,
        OR: [{ start_date: { lte: endDate }, end_date: { gte: startDate } }],
      },
    });

    if (overlappingBooking) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Conflit de réservation : ces dates ne sont pas disponibles",
      });
    }

    // Création de la réservation
    const newBooking = await prisma.bookings.create({
      data: {
        start_date: startDate,
        end_date: endDate,
        adId,
        tenantId: userId,
      },
    });

    return {
      data: {
        result: true,
        newBooking,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la réservation :", error);
    throw createError({
      statusCode: 500,
      statusMessage:
        "Une erreur est survenue lors de la création de la réservation",
    });
  }
});
