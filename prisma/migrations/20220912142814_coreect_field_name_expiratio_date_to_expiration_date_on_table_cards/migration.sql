/*
  Warnings:

  - You are about to drop the column `expiratioDate` on the `cards` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "expiratioDate",
ADD COLUMN     "expirationDate" TEXT NOT NULL;
