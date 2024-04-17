-- AlterTable
ALTER TABLE "post_categories" ALTER COLUMN "post_category_updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "post_category_groups" ALTER COLUMN "post_category_group_updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "post_comments" ALTER COLUMN "post_comment_updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "post_updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_profile" ALTER COLUMN "user_profile_updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_relations" ALTER COLUMN "user_relation_updated_at" DROP NOT NULL;
