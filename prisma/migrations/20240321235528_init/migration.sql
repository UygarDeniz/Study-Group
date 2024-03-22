-- AlterTable
ALTER TABLE `group` ADD COLUMN `avatar` VARCHAR(191) NOT NULL DEFAULT 'https://utfs.io/f/767e333e-24de-448c-841b-1437f70835e2-b4dc8y.png';

-- AlterTable
ALTER TABLE `user` MODIFY `avatar` VARCHAR(191) NULL DEFAULT 'https://utfs.io/f/ec604648-73dc-45d7-97e2-2ae2b6137f89-oubu9r.jpg';
