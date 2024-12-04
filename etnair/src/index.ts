//import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import adsRouter from "./routes/adscontroller";
import bookRouter from "./routes/bookingcontroller";
import usersRouter from "./routes/usersRouter";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/ads", adsRouter);
app.use("/booking", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello").status(200);
});

app.listen(port, () => {
  console.log(`run serveur http://localhost:${port}`)

});

//app.use('/users', usersRouter)










