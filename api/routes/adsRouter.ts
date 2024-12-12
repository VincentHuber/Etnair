import { Router } from "express";
import { createAd, deleteAd, getAds, getAllAds, updateAd } from "../controllers/adsController";
const adsRouter: Router = Router();

adsRouter.get("/", getAllAds);
adsRouter.get("/getAds", getAds);
adsRouter.post("/create", createAd);
adsRouter.put("/update", updateAd);
adsRouter.delete("/delete", deleteAd);

export default adsRouter;