/*
  Warnings:

  - You are about to drop the column `expense` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "expense",
ADD COLUMN     "dueAmount" INTEGER NOT NULL DEFAULT 0;
