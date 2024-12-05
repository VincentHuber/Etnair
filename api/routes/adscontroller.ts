import { Router } from "express";
import { createAds, deleteAds, getAdsById, getAllAds, updateAds } from "../controllers/adscontroller";
const adsRouter: Router = Router();

adsRouter.get("/", getAllAds);
adsRouter.get("/:id", getAdsById);
adsRouter.post("/", createAds);
adsRouter.put("/:id", updateAds);
adsRouter.delete("/:id", deleteAds);

export default adsRouter;