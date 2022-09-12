/*
  Warnings:

  - You are about to drop the column `name` on the `cards` table. All the data in the column will be lost.
  - Added the required column `tag` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "name",
ADD COLUMN     "tag" VARCHAR(50) NOT NULL;
