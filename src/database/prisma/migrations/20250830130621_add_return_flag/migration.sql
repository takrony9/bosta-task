-- AlterTable
ALTER TABLE `borrowing` ADD COLUMN `isReturned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `returnDate` DATETIME(3) NULL;
