/*
  Warnings:

  - You are about to drop the column `tag` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `credentials` table. All the data in the column will be lost.
  - Added the required column `name` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "tag",
DROP COLUMN "userName",
ADD COLUMN     "name" VARCHAR(50) NOT NULL;
