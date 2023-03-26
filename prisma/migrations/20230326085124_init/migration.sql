-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAssets" DROP CONSTRAINT "UserAssets_id_fkey";

-- AlterTable
ALTER TABLE "UserAssets" ALTER COLUMN "height" SET DEFAULT 496,
ALTER COLUMN "width" SET DEFAULT 728,
ALTER COLUMN "avatar_url" SET DEFAULT 'https://ik.imagekit.io/artboomer/pawstagram/imgbin-photography-cat-paris-cat-HvR60Gek0CaHsRM1qMh3vHAwM.jpg?updatedAt=1679255451128';

-- AddForeignKey
ALTER TABLE "UserAssets" ADD CONSTRAINT "UserAssets_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
