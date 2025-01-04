import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Route pour supprimer son profil
export default defineEventHandler(async (event) => {
  try {
    // Récupération du token depuis le header
    const headers = getRequestHeaders(event);
    const authHeader = headers["authorization"];

    if (!authHeader) {
      throw createError({
        statusCode: 400,
        statusMessage: "Token manquant ou invalide",
      });
    }

    //Extrait et décode le token
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);

    // Extraction de l'userId du token
    const userId = (decodedToken as { userId: string }).userId;

    // Suppression de l'utilisateur dans la base de données
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // Réponse indiquant que l'utilisateur a été supprimé
    return {
      data: {
        result: true,
        body: { message: "Utilisateur supprimé avec succès" },
      },
    };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue lors de la suppression",
    });
  }
});
