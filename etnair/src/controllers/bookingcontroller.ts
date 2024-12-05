import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const bookPrisma = new PrismaClient().bookings;

//getAllBooking
export const getAllBook = async (req: Request, res: Response) => {
  try {
    const allBook = await bookPrisma.findMany({

    })
    res.status(200).json({ data: allBook });
  } catch (e) {
    console.log(e)
  }
};

//getBookingById
export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id
    const allBook = await bookPrisma.findUnique({
      where: {
        id: parseInt(bookId),
      }
    })
    res.status(200).json({ data: allBook });
  } catch (e) {
    console.log(e)
  }
};

//createBooking
export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const allBook = await bookPrisma.create({
      data: bookData
    })
    res.status(201).json({ data: allBook });
  } catch (e) {
    console.log(e)
  }
};

//updateBooking
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id
    const bookData = req.body;
    const allBook = await bookPrisma.update({
      where: {
        id: parseInt(bookId),
      },
      data: bookData,
    });

    res.status(200).json({ data: allBook });
  } catch (e) {
    console.log(e)
  }
};

//deleteBooking
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id
    const allBook = await bookPrisma.delete({
      where: {
        id: parseInt(bookId),
      }
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.log(e);
  }
}
