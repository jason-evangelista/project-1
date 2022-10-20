/*
  Warnings:

  - You are about to drop the column `password` on the `user_profile` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `user_profile` table. All the data in the column will be lost.
  - Added the required column `name` to the `user_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "password",
DROP COLUMN "user_name",
ADD COLUMN     "name" TEXT NOT NULL;
