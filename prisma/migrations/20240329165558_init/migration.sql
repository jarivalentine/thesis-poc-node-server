/*
  Warnings:

  - The primary key for the `Workspace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_boardId_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWorkspace" DROP CONSTRAINT "_UserToWorkspace_B_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "boardId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "_UserToWorkspace" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Board";

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_name_key" ON "Workspace"("name");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Workspace"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkspace" ADD CONSTRAINT "_UserToWorkspace_B_fkey" FOREIGN KEY ("B") REFERENCES "Workspace"("name") ON DELETE CASCADE ON UPDATE CASCADE;
