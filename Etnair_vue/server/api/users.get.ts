import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Route pour trouver tous les utilisateurs
export default defineEventHandler(async () => {
  try {
    // Récupération des utilisateurs avec relations
    const allUsers = await prisma.user.findMany({
      include: {
        ads: true,
        bookings: true,
      },
    });

    // Vérification si aucun utilisateur n'existe
    if (allUsers.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Aucun utilisateur trouvé.",
      });
    }

    // Retour de la liste des utilisateurs
    return {
      data: { 
        result:true,
        allUsers
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue lors de la récupération des utilisateurs.",
      data: error,
    });
  }
});
