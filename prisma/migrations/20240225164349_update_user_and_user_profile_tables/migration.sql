/*
  Warnings:

  - Added the required column `user_profile_father_id` to the `user_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "user_profile_father_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_profile_father_id_fkey" FOREIGN KEY ("user_profile_father_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
