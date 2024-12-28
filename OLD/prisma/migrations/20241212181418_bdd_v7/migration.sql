/*
  Warnings:

  - You are about to drop the column `adsId` on the `Bookings` table. All the data in the column will be lost.
  - Added the required column `adId` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_adsId_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "adsId",
ADD COLUMN     "adId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
