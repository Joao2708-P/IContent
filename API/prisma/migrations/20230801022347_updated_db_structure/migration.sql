/*
  Warnings:

  - A unique constraint covering the columns `[user_name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_content` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolLevelId` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolSubjectId` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_user` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolLevelId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contents` ADD COLUMN `assessment` ENUM('WELL_RATED', 'POORLY_RATED') NOT NULL DEFAULT 'WELL_RATED',
    ADD COLUMN `body` MEDIUMTEXT NOT NULL,
    ADD COLUMN `image_content` LONGTEXT NOT NULL,
    ADD COLUMN `schoolLevelId` VARCHAR(191) NOT NULL,
    ADD COLUMN `schoolSubjectId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `image_user` LONGTEXT NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `schoolLevelId` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `school_levels` (
    `id` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `school_levels_level_key`(`level`),
    UNIQUE INDEX `school_levels_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `school_subjects` (
    `id` VARCHAR(191) NOT NULL,
    `discipline` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `school_subjects_discipline_key`(`discipline`),
    UNIQUE INDEX `school_subjects_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_user_name_key` ON `users`(`user_name`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
