/*
  Warnings:

  - Added the required column `post_comment_author_id` to the `post_comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_comment_post_id` to the `post_comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_comments" DROP CONSTRAINT "post_comments_post_comment_father_id_fkey";

-- DropForeignKey
ALTER TABLE "user_relations" DROP CONSTRAINT "user_relations_user_relation_followed_id_fkey";

-- DropForeignKey
ALTER TABLE "user_relations" DROP CONSTRAINT "user_relations_user_relation_follower_id_fkey";

-- AlterTable
ALTER TABLE "post_comments" ADD COLUMN     "post_comment_author_id" TEXT NOT NULL,
ADD COLUMN     "post_comment_post_id" TEXT NOT NULL,
ALTER COLUMN "post_comment_father_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_relations" ALTER COLUMN "user_relation_follower_id" DROP NOT NULL,
ALTER COLUMN "user_relation_followed_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_comment_father_id_fkey" FOREIGN KEY ("post_comment_father_id") REFERENCES "post_comments"("post_comment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_comment_post_id_fkey" FOREIGN KEY ("post_comment_post_id") REFERENCES "posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_comment_author_id_fkey" FOREIGN KEY ("post_comment_author_id") REFERENCES "user_profile"("user_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_relations" ADD CONSTRAINT "user_relations_user_relation_follower_id_fkey" FOREIGN KEY ("user_relation_follower_id") REFERENCES "user_profile"("user_profile_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_relations" ADD CONSTRAINT "user_relations_user_relation_followed_id_fkey" FOREIGN KEY ("user_relation_followed_id") REFERENCES "user_profile"("user_profile_id") ON DELETE SET NULL ON UPDATE CASCADE;
