import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { usersRouter } from "./users/router";


dotenv.config();

export const prisma = new PrismaClient;
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  //Logger.info("Serveur démarré sur le port 8080");
  res.send("hello");
});

app.listen(port, () => {
  console.log(`run serveur http://localhost:${port}`)
  //Logger.debug(`Server is up and running @ http://localhost:${port}`);
});

app.use('/users', usersRouter)










