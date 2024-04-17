/*
  Warnings:

  - The `post_comment_images` column on the `post_comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `post_images` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_PostToPostCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `post_category_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostToPostCategory" DROP CONSTRAINT "_PostToPostCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToPostCategory" DROP CONSTRAINT "_PostToPostCategory_B_fkey";

-- AlterTable
ALTER TABLE "post_comments" DROP COLUMN "post_comment_images",
ADD COLUMN     "post_comment_images" BYTEA;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "post_category_id" TEXT NOT NULL,
DROP COLUMN "post_images",
ADD COLUMN     "post_images" BYTEA;

-- DropTable
DROP TABLE "_PostToPostCategory";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_category_id_fkey" FOREIGN KEY ("post_category_id") REFERENCES "post_categories"("post_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
