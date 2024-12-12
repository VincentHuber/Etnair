//import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import adsRouter from "./routes/adsRouter";
import bookRouter from "./routes/bookingRouter";
import loginRouter from "./routes/registerRouter";
import usersRouter from "./routes/usersRouter";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/ads", adsRouter);
app.use("/booking", bookRouter);
app.use("/auth", loginRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO").status(200);
});

app.listen(port, () => {
  console.log(`run serveur http://localhost:${port}`)

});

//app.use('/users', usersRouter)










