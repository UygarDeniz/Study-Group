-- AlterTable
ALTER TABLE `comment` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `group` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `groupadmin` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `post` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `CommentLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `commentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
