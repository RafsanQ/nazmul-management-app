/*
  Warnings:

  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_officeAssistantId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "officeAssistantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_officeAssistantId_fkey" FOREIGN KEY ("officeAssistantId") REFERENCES "OfficeAssistant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
