/*
  Warnings:

  - You are about to drop the column `post_comment_father_id` on the `post_comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_comments" DROP CONSTRAINT "post_comments_post_comment_father_id_fkey";

-- AlterTable
ALTER TABLE "post_comments" DROP COLUMN "post_comment_father_id";
