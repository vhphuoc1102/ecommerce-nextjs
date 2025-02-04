/*
  Warnings:

  - Added the required column `update_ts` to the `fms_file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sold_cnt` to the `pms_sku` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "fms_file" ADD COLUMN     "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "update_ts" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pms_product" ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sold_cnt" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tag" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "pms_sku" ADD COLUMN     "sold_cnt" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "pms_comment" (
    "comment_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "user_ip" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "attribute" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pms_comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "pms_comment_reply" (
    "comment_reply_id" SERIAL NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "author_type" "UserType" NOT NULL,
    "author_name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "content" TEXT NOT NULL,
    "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pms_comment_reply_pkey" PRIMARY KEY ("comment_reply_id")
);

-- CreateTable
CREATE TABLE "pms_favorite" (
    "favorite_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pms_favorite_pkey" PRIMARY KEY ("favorite_id")
);

-- AddForeignKey
ALTER TABLE "pms_sku" ADD CONSTRAINT "pms_sku_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "pms_product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pms_comment" ADD CONSTRAINT "pms_comment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "pms_product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pms_comment_reply" ADD CONSTRAINT "pms_comment_reply_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "pms_comment"("comment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pms_favorite" ADD CONSTRAINT "pms_favorite_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "pms_product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
