import { Router } from "express";
import { createAds, deleteAds, getAdsById, getAllAds, updateAds } from "../controllers/adsController";
const adsRouter: Router = Router();

adsRouter.get("/", getAllAds);
adsRouter.get("/:id", getAdsById);
adsRouter.post("/:nickname/ad", createAds);
adsRouter.put("/:id", updateAds);
adsRouter.delete("/:id", deleteAds);

export default adsRouter;
