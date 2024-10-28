-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_key" ON "Card"("id");
