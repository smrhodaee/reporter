/*
  Warnings:

  - You are about to drop the column `position` on the `Property` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "log_id" TEXT NOT NULL,
    CONSTRAINT "Property_log_id_fkey" FOREIGN KEY ("log_id") REFERENCES "Log" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("id", "log_id", "title", "type", "value") SELECT "id", "log_id", "title", "type", "value" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
