import { Router } from "express";
import { createBook, deleteBook, getAllBook, getBookById, updateBook } from "../controllers/bookingController";

const bookRouter: Router = Router();

bookRouter.get("/", getAllBook);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;