/*
  Warnings:

  - A unique constraint covering the columns `[userId,tag]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_tag_key" ON "credentials"("userId", "tag");
