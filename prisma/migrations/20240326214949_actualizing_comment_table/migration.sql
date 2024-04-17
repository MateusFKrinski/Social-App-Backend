/*
  Warnings:

  - You are about to drop the column `post_comment_parent_id` on the `post_comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_comments" DROP CONSTRAINT "post_comments_post_comment_parent_id_fkey";

-- AlterTable
ALTER TABLE "post_comments" DROP COLUMN "post_comment_parent_id",
ADD COLUMN     "post_comment_father_id" TEXT;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_comment_father_id_fkey" FOREIGN KEY ("post_comment_father_id") REFERENCES "post_comments"("post_comment_id") ON DELETE SET NULL ON UPDATE CASCADE;
