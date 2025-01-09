import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Route pour trouver une annonce
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'slug')

  try {
    // Récupération d'une annonces avec l'id de l'annonce
    const ad = await prisma.ads.findUnique({
        where:{ id : Number(id)},
        include: {
        renter: true,
      },
    });

    // Vérification si aucune annonce n'a été trouvée
    if (!ad) {
      throw createError({
        statusCode: 404,
        statusMessage: "Aucune annonce trouvée.",
      });
    }

    // Renvoie l'annonce
    return { ad };
    
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce:", error);
    throw createError({
      statusCode: 500,
      statusMessage:
        "Une erreur est survenue lors de la récupération de l'annonce.",
    });
  }
});
