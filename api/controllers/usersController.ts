import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const userPrisma = new PrismaClient().user;

//getAllUsers
export const getAllUsers = async (req: any, res: any) => {
  try {
    const allUser = await userPrisma.findMany({

    })
    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e)
  }
};

//getUserById
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const allUser = await userPrisma.findUnique({
      where: {
        id: parseInt(userId),
      }
    })
    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e)
  }
};

//createUser
export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const allUser = await userPrisma.create({
      data: userData
    })
    res.status(201).json({ data: allUser });
  } catch (e) {
    console.log(e)
  }
};

//updateUser
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const userData = req.body;
    const allUser = await userPrisma.update({
      where: {
        id: parseInt(userId),
      },
      data: userData,
    });

    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e)
  }
};

//deleteUser
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const allUser = await userPrisma.delete({
      where: {
        id: parseInt(userId),
      }
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.log(e);
  }
}
