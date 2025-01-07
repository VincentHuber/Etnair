import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Route pour trouver toutes les annonces
export default defineEventHandler(async (event) => {
  try {
    // Récupération des annonces avec les donnés du loueurs
    const allAds = await prisma.ads.findMany({
      include: {
        renter: true,
      },
    });

    // Vérification si aucune annonce n'a été trouvée
    if (allAds.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Aucune annonce trouvée.",
      });
    }

    // Retour de la liste des annonces
    return { allAds };
    
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces:", error);
    throw createError({
      statusCode: 500,
      statusMessage:
        "Une erreur est survenue lors de la récupération des annonces.",
    });
  }
});
