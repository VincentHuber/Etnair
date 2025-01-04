import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const tokenSecret = process.env.JWT_SECRET as string;
const bookingsPrisma = new PrismaClient().bookings;

export default defineEventHandler(async (event) => {
  try {
    // Vérifie la présence de la clé secrète
    if (!tokenSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: "Clé secrète manquante pour le token",
      });
    }

    // Récupération et vérification du token
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

    // Extraction de l'userId du token
    const userId = (decodedToken as { userId: string }).userId;

    // Récupération de l'identifiant de la réservation
    const { bookingId } = await readBody(event);

    if (!bookingId) {
      throw createError({
        statusCode: 400,
        statusMessage: "L'identifiant de la réservation est manquant",
      });
    }

    // Vérification de l'existence de la réservation
    const existingBooking = await bookingsPrisma.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      throw createError({
        statusCode: 404,
        statusMessage: "Réservation introuvable",
      });
    }

    // Vérifie si l'utilisateur est bien le propriétaire de la réservation
    if (existingBooking.tenantId !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: "Vous n'êtes pas autorisé à supprimer cette réservation",
      });
    }

    // Suppression de la réservation
    await bookingsPrisma.delete({
      where: { id: bookingId },
    });

    return {
      data: {
        result: true,
        message: "Réservation supprimée avec succès",
      },
    };
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation :", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue lors de la suppression",
    });
  }
});
