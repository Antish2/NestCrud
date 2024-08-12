/*
  Warnings:

  - The primary key for the `token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `token_id` on the `token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "token" DROP CONSTRAINT "token_pkey",
DROP COLUMN "token_id",
ADD COLUMN     "token_id" UUID NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "token_user_id_idx" ON "token"("user_id");
