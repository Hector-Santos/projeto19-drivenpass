/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "notes_userId_title_key" ON "notes"("userId", "title");
