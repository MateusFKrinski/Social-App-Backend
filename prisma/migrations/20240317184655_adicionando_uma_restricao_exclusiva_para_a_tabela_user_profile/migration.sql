/*
  Warnings:

  - A unique constraint covering the columns `[user_profile_father_id]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_profile_father_id_key" ON "user_profile"("user_profile_father_id");
