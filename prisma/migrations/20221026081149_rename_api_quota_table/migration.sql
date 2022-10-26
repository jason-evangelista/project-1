/*
  Warnings:

  - You are about to drop the `ApiQouta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApiQouta" DROP CONSTRAINT "ApiQouta_fromUser_fkey";

-- DropTable
DROP TABLE "ApiQouta";

-- CreateTable
CREATE TABLE "api_quota" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT,
    "apiCallLimit" INTEGER NOT NULL DEFAULT 20,
    "apiCallCoolDown" TEXT,
    "fromUser" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "api_quota_id_key" ON "api_quota"("id");

-- CreateIndex
CREATE UNIQUE INDEX "api_quota_fromUser_key" ON "api_quota"("fromUser");

-- AddForeignKey
ALTER TABLE "api_quota" ADD CONSTRAINT "api_quota_fromUser_fkey" FOREIGN KEY ("fromUser") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
