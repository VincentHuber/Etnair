import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Route pour trouver toutes les réservations
export default defineEventHandler(async () => {
  try {
    // Récupération des annonces avec les donnés du loueurs
    const allBookings = await prisma.bookings.findMany({
      include: {
        tenant: true,
        ads: true,
      },
    });

    // Vérification si aucune annonce n'a été trouvée
    if (allBookings.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Aucune réservation trouvée.",
      });
    }

    // Retour de la liste des annonces
    return {
      data: {
        result:true,
        allBookings
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw createError({
      statusCode: 500,
      statusMessage:
        "Une erreur est survenue lors de la récupération des réservations.",
    });
  }
});
