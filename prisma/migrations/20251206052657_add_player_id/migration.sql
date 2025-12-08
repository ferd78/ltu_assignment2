/*
  Warnings:

  - Added the required column `playerId` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "playerId" TEXT NOT NULL;
