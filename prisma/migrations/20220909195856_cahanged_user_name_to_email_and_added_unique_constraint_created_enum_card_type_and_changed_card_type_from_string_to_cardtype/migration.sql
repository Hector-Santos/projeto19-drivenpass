/*
  Warnings:

  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `cardType` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT', 'DEBIT', 'CREDIT_DEBIT');

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "cardType",
ADD COLUMN     "cardType" "CardType" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userName",
ADD COLUMN     "email" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
