/*
  Warnings:

  - Added the required column `title` to the `Heardle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Heardle" ADD COLUMN     "title" TEXT NOT NULL;
