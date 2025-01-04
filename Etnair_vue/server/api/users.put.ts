import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET as string;
const userPrisma = new PrismaClient().user;

// Route pour mettre à jour son profil
export default defineEventHandler(async (event) => {
  try {
    // Récupération du token depuis le header
    const headers = getRequestHeaders(event);
    const authHeader = headers["authorization"];

    const body = await readBody(event);

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

    // Mise à jour de l'utilisateur en se basant sur l'userId
    const updatedUser = await userPrisma.update({
      where: { id: userId },
      data: {
        nickname: body.nickname,
        email: body.email,
        picture: body.picture,
      },
    });

    // Retour des données mises à jour
    return {
      data: {
        result: true,
        nickname: updatedUser.nickname,
        email: updatedUser.email,
        picture: updatedUser.picture,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue lors de la la mise à jour.",
    });
  }
});
