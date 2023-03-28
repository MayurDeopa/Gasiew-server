/*
  Warnings:

  - Added the required column `fileId` to the `PostAssets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `UserAssets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostAssets" ADD COLUMN     "fileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAssets" ADD COLUMN     "fileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserBanner" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 496,
    "width" INTEGER NOT NULL DEFAULT 728,
    "fileId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "UserBanner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBanner_id_key" ON "UserBanner"("id");

-- AddForeignKey
ALTER TABLE "UserBanner" ADD CONSTRAINT "UserBanner_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
