-- CreateTable
CREATE TABLE "ApiQouta" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT,
    "apiCallLimit" INTEGER NOT NULL DEFAULT 20,
    "apiCallCoolDown" TEXT,
    "fromUser" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiQouta_id_key" ON "ApiQouta"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ApiQouta_fromUser_key" ON "ApiQouta"("fromUser");

-- AddForeignKey
ALTER TABLE "ApiQouta" ADD CONSTRAINT "ApiQouta_fromUser_fkey" FOREIGN KEY ("fromUser") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
