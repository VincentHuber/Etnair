import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  //Logger.info("Serveur démarré sur le port 8080");
  res.send("hello");
});

app.listen(port, () => {
  console.log(`run serveur http://localhost:${port}`)
  //Logger.debug(`Server is up and running @ http://localhost:${port}`);
});










