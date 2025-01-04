import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import adsRouter from "./routes/adsRouter";
import bookingRouter from "./routes/bookingRouter";
import authRouter from "./routes/authRouter";
import usersRouter from "./routes/usersRouter";

// Charge la variable d'environnement
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Analyse le corps des requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Définition des routes
app.use("/users", usersRouter);
app.use("/ads", adsRouter);
app.use("/booking", bookingRouter);
app.use("/auth", authRouter)

// Route par défaut
app.get("/", (req: Request, res: Response) => {
  res.status(200).end();
});

// Démarre le serveur
app.listen(port, () => {
  console.log(`run serveur localhost:${port}`)
});










