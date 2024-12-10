import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const adsPrisma = new PrismaClient();

//getAllAds
export const getAllAds = async (req: Request, res: Response) => {
  try {
    const allAds = await adsPrisma.ads.findMany({

    })
    res.status(200).json({ data: allAds });
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "error" });
  }
};

//getAdsById
export const getAdsById = async (req: Request, res: Response) => {
  const adsId = req.params.id
  try {
    if (!req.body.id) {
      res.status(400).json({ error: "id not found" });
      return;
    }
    const allAds = await adsPrisma.ads.findUnique({
      where: {
        id: parseInt(adsId),
      }
    })
    res.status(200).json({ data: allAds });
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "error" });
  }
};

//createAds
export const createAds = async (req: Request, res: Response) => {
  const nickname = req.params.nickname;
  const { title, description, location, nightly_price } = req.body;

  try {
    if (!req.body.id) {
      res.status(400).json({ error: "id not found" });
      return;
    }
    const user = await adsPrisma.user.findUnique({
      where: { nickname },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const newAds = await adsPrisma.ads.create({
      data: {
        title,
        description,
        location,
        nightly_price,
        renterName: nickname,
      },
    });
    res.status(200).json({ data: newAds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
};

//updateAds
export const updateAds = async (req: Request, res: Response) => {
  const adsId = req.params.id
  const adsData = req.body;
  try {
    if (!req.body.id) {
      res.status(400).json({ error: "id not found" });
      return;
    }
    const allAds = await adsPrisma.ads.update({
      where: {
        id: parseInt(adsId),
      },
      data: adsData,
    });

    res.status(200).json({ data: allAds });
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "error" });
  }
};

//deleteAds
export const deleteAds = async (req: Request, res: Response) => {
  const adsId = req.params.id
  try {
    if (!req.body.id) {
      res.status(400).json({ error: "id not found" });
      return;
    }
    const allAds = await adsPrisma.ads.delete({
      where: {
        id: parseInt(adsId),
      }
    });
    res.status(200).json({ message: "ads deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error" });
  }
}
