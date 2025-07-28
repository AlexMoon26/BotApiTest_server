/*
  Warnings:

  - You are about to drop the column `picture` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telegramId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `telegramId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "picture",
ADD COLUMN     "telegramId" TEXT NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "nickName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");
