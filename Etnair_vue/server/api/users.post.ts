import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const prisma = new PrismaClient();
const tokenSecret = process.env.JWT_SECRET as string;

// Route pour s'inscrire
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    // Vérifie si les champs sont vides
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email et mot de passe sont requis.",
      });
    }

    // Vérifie la présence de tokenSecret
    if (!tokenSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: "Clé secrète manquante pour le token.",
      });
    }

    // Vérifie si l'email ou le nickname existe déjà
    const existingUser = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (existingUser) {
      if (existingUser.email === body.email) {
        throw createError({
          statusCode: 400,
          statusMessage: "Email déjà utilisé.",
        });
      }
    }

    // Hache le mot de passe
    const hashedPassword = bcrypt.hashSync(body.password, 10);

    // Crée un nouvel utilisateur
    const newUser = await prisma.user.create({
      data: {
        nickname: body.nickname,
        email: body.email,
        password: hashedPassword,
        picture: body.picture || null,
        host_arrived: false,
      },
    });

    // Crée un token JWT
    const token = jwt.sign({ userId: newUser.id }, tokenSecret);

    // Retourne les informations de l'utilisateur avec le token
    return {
      data: {
        result:true,
        nickname: newUser.nickname,
        email: newUser.email,
        picture: newUser.picture,
        token: token,
        ads:[],
        bookings:[],
      },
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue lors de l'inscription.",
    });
  }
});
