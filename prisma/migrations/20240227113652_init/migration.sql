/*
  Warnings:

  - Added the required column `groupId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `groupId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
