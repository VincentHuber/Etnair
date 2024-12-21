import { Router } from "express";
import { createAd, deleteAd, updateAd } from "../controllers/adsController";
const adsRouter: Router = Router();

adsRouter.post("/create", createAd);
adsRouter.put("/update", updateAd);
adsRouter.delete("/delete", deleteAd);

export default adsRouter;