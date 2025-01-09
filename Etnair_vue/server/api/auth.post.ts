import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
dotenv.config();

const tokenSecret = process.env.JWT_SECRET as string;
const prisma = new PrismaClient();

// Route pour se connecter
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Vérifie si les champs sont vides
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email et mot de passe sont requis",
      });
    }

    // Vérifie le tokenSecret
    if (!tokenSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: "Clé secrète manquante pour le token",
      });
    }

    // Vérifie si l'utilisateur existe
    const existingUser = await prisma.user.findFirst({
      where: { email: body.email }, 
      include: {
        ads: true,
        bookings: true,
      },
    });

    if (!existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "Utilisateur non trouvé",
      });
    }

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(
      body.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw createError({
        statusCode: 400,
        statusMessage: "Mot de passe incorrect",
      });
    }

    // Création du token
    const token = jwt.sign({ userId: existingUser.id }, tokenSecret);


    // Retourne les informations si tout est valide
    return {
      data: {
        result: true,
        email: existingUser.email,
        nickname: existingUser.nickname,
        picture:existingUser.picture,
        ads : existingUser.ads,
        bookings : existingUser.bookings,
        token: token,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue lors de la connexion",
    });
  }
});
