-- AlterTable
ALTER TABLE "post_comments" ADD COLUMN     "post_comment_parent_id" TEXT;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_comment_parent_id_fkey" FOREIGN KEY ("post_comment_parent_id") REFERENCES "post_comments"("post_comment_id") ON DELETE SET NULL ON UPDATE CASCADE;
