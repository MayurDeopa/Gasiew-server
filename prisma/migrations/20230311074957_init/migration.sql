-- CreateTable
CREATE TABLE "PostAssets" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "PostAssets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostAssets_id_key" ON "PostAssets"("id");

-- AddForeignKey
ALTER TABLE "PostAssets" ADD CONSTRAINT "PostAssets_id_fkey" FOREIGN KEY ("id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
