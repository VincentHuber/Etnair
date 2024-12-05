import { PrismaClient } from "@prisma/client";

const adsPrisma = new PrismaClient().ads;

//getAllAds
export const getAllAds = async (req: any, res: any) => {
  try {
    const allAds = await adsPrisma.findMany({

    })
    res.status(200).json({ data: allAds });
  } catch (e) {
    console.log(e)
  }
};

//getAdsById
export const getAdsById = async (req: any, res: any) => {
  try {
    const adsId = req.params.id
    const allAds = await adsPrisma.findUnique({
      where: {
        id: parseInt(adsId),
      }
    })
    res.status(200).json({ data: allAds });
  } catch (e) {
    console.log(e)
  }
};

//createAds
export const createAds = async (req: any, res: any) => {
  try {
    const adsData = req.body;
    const allAds = await adsPrisma.create({
      data: adsData
    })
    res.status(201).json({ data: allAds });
  } catch (e) {
    console.log(e)
  }
};

//updateAds
export const updateAds = async (req: any, res: any) => {
  try {
    const adsId = req.params.id
    const adsData = req.body;
    const allAds = await adsPrisma.update({
      where: {
        id: parseInt(adsId),
      },
      data: adsData,
    });

    res.status(200).json({ data: allAds });
  } catch (e) {
    console.log(e)
  }
};

//deleteAds
export const deleteAds = async (req: any, res: any) => {
  try {
    const adsId = req.params.id
    const allAds = await adsPrisma.delete({
      where: {
        id: parseInt(adsId),
      }
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.log(e);
  }
}
