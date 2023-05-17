/*
  Warnings:

  - You are about to drop the column `uuid` on the `Search` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Search` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Search" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "answer" TEXT NOT NULL
);
INSERT INTO "new_Search" ("answer", "id", "prompt") SELECT "answer", "id", "prompt" FROM "Search";
DROP TABLE "Search";
ALTER TABLE "new_Search" RENAME TO "Search";
CREATE UNIQUE INDEX "Search_slug_key" ON "Search"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
