/*
  Warnings:

  - Added the required column `adress` to the `Ads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ads" ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "bookable_dates" TIMESTAMP(3)[];
