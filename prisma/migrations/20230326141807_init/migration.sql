-- AlterTable
ALTER TABLE "UserAssets" ALTER COLUMN "height" DROP DEFAULT,
ALTER COLUMN "width" DROP DEFAULT,
ALTER COLUMN "avatar_url" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserBanner" ALTER COLUMN "height" DROP DEFAULT,
ALTER COLUMN "width" DROP DEFAULT;
