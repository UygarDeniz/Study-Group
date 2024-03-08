/*
  Warnings:

  - You are about to drop the column `userId` on the `group` table. All the data in the column will be lost.
  - You are about to drop the `groupmember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `Group_userId_fkey`;

-- DropForeignKey
ALTER TABLE `groupmember` DROP FOREIGN KEY `GroupMember_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `groupmember` DROP FOREIGN KEY `GroupMember_userId_fkey`;

-- AlterTable
ALTER TABLE `group` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `groupmember`;

-- CreateTable
CREATE TABLE `_GroupToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GroupToUser_AB_unique`(`A`, `B`),
    INDEX `_GroupToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GroupToUser` ADD CONSTRAINT `_GroupToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToUser` ADD CONSTRAINT `_GroupToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
