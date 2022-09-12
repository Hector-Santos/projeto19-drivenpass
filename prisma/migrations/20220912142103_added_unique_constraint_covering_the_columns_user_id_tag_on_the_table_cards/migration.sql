/*
  Warnings:

  - A unique constraint covering the columns `[userId,tag]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_tag_key" ON "cards"("userId", "tag");
