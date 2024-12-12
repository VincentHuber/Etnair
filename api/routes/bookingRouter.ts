import { Router } from "express";
import { createBooking, deleteBooking } from "../controllers/bookingController";

const bookingRouter: Router = Router();

bookingRouter.post("/create", createBooking);
bookingRouter.delete("/delete", deleteBooking);

export default bookingRouter;