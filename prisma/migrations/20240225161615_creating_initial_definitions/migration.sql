-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'N', 'O');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "user_full_name" TEXT NOT NULL,
    "user_username" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_role" "Role" NOT NULL DEFAULT 'USER',
    "user_created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "user_profile_id" TEXT NOT NULL,
    "user_profile_avatar" BYTEA,
    "user_profile_bio" TEXT,
    "user_profile_birth" DATE NOT NULL,
    "user_profile_phone" VARCHAR(14) NOT NULL,
    "user_profile_active" BOOLEAN NOT NULL DEFAULT true,
    "user_profile_gender" "Gender" NOT NULL,
    "user_profile_created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_profile_updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_profile_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" TEXT NOT NULL,
    "post_author_id" TEXT NOT NULL,
    "post_content" TEXT NOT NULL,
    "post_images" BYTEA[],
    "post_like" INTEGER NOT NULL DEFAULT 0,
    "post_created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "post_comments" (
    "post_comment_id" TEXT NOT NULL,
    "post_comment_father_id" TEXT NOT NULL,
    "post_comment_content" TEXT NOT NULL,
    "post_comment_images" BYTEA[],
    "post_comment_like" INTEGER NOT NULL DEFAULT 0,
    "post_comment_created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_comment_updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "post_comments_pkey" PRIMARY KEY ("post_comment_id")
);

-- CreateTable
CREATE TABLE "post_categories" (
    "post_category_id" TEXT NOT NULL,
    "post_category_group_id" TEXT NOT NULL,
    "post_category_name" TEXT NOT NULL,
    "post_category_created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_category_updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "post_categories_pkey" PRIMARY KEY ("post_category_id")
);

-- CreateTable
CREATE TABLE "post_category_groups" (
    "post_category_group_id" TEXT NOT NULL,
    "post_category_group_name" TEXT NOT NULL,
    "post_category_group_created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_category_group_updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "post_category_groups_pkey" PRIMARY KEY ("post_category_group_id")
);

-- CreateTable
CREATE TABLE "user_relations" (
    "user_relation_id" TEXT NOT NULL,
    "user_relation_follower_id" TEXT NOT NULL,
    "user_relation_followed_id" TEXT NOT NULL,
    "user_relation_created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_relation_updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "user_relations_pkey" PRIMARY KEY ("user_relation_id")
);

-- CreateTable
CREATE TABLE "_PostToPostCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_username_key" ON "users"("user_username");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToPostCategory_AB_unique" ON "_PostToPostCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToPostCategory_B_index" ON "_PostToPostCategory"("B");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_author_id_fkey" FOREIGN KEY ("post_author_id") REFERENCES "user_profile"("user_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_comment_father_id_fkey" FOREIGN KEY ("post_comment_father_id") REFERENCES "post_comments"("post_comment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_post_category_group_id_fkey" FOREIGN KEY ("post_category_group_id") REFERENCES "post_category_groups"("post_category_group_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_relations" ADD CONSTRAINT "user_relations_user_relation_follower_id_fkey" FOREIGN KEY ("user_relation_follower_id") REFERENCES "user_profile"("user_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_relations" ADD CONSTRAINT "user_relations_user_relation_followed_id_fkey" FOREIGN KEY ("user_relation_followed_id") REFERENCES "user_profile"("user_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToPostCategory" ADD CONSTRAINT "_PostToPostCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToPostCategory" ADD CONSTRAINT "_PostToPostCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "post_categories"("post_category_id") ON DELETE CASCADE ON UPDATE CASCADE;
