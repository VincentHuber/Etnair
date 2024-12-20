/*
  Warnings:

  - You are about to drop the column `address` on the `Ads` table. All the data in the column will be lost.
  - You are about to drop the column `nightly_price` on the `Ads` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - Added the required column `city` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_guests` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_rooms` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_adress` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ads" DROP COLUMN "address",
DROP COLUMN "nightly_price",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "number_of_guests" INTEGER NOT NULL,
ADD COLUMN     "number_of_rooms" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "street_adress" TEXT NOT NULL,
ADD COLUMN     "zipcode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicture",
ADD COLUMN     "picture" TEXT NOT NULL;
