-- CreateTable
CREATE TABLE "Search" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "answer" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Search_uuid_key" ON "Search"("uuid");
