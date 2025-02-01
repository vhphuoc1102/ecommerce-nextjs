-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('PUBLISH', 'DRAFT');

-- CreateEnum
CREATE TYPE "VERIFY_STATUS" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "NewStatus" AS ENUM ('NEW', 'LIKE_NEW', 'USED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "FileKind" AS ENUM ('USER_DEFAULT_AVATAR', 'USER_AVATAR', 'USER_COMMENT', 'PRODUCT', 'ALBUM_ITEM', 'CATEGORY_PIC', 'CATEGORY_LOGO', 'BRAND_PIC', 'BRAND_LOGO');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'OTHER');

-- CreateTable
CREATE TABLE "ams_user" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(241) NOT NULL,
    "password" TEXT NOT NULL,
    "verified_ts" TIMESTAMP(3),
    "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ams_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "ams_admin" (
    "admin_id" SERIAL NOT NULL,
    "email" VARCHAR(241) NOT NULL,
    "password" TEXT NOT NULL,
    "verified_ts" TIMESTAMP(3),
    "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ams_admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "ams_admin_account" (
    "admin_id" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expire_ts" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ams_admin_account_pkey" PRIMARY KEY ("provider","provider_account_id")
);

-- CreateTable
CREATE TABLE "ams_admin_session" (
    "session_token" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "expire_ts" TIMESTAMP(3) NOT NULL,
    "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_ts" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ams_admin_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expire_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ams_admin_token_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "ams_admin_authenticator" (
    "credential_id" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "credential_public_key" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credential_device_type" TEXT NOT NULL,
    "credential_backed_up" BOOLEAN NOT NULL,
    "transport" TEXT,

    CONSTRAINT "ams_admin_authenticator_pkey" PRIMARY KEY ("admin_id","credential_id")
);

-- CreateTable
CREATE TABLE "fms_file" (
    "fid" INTEGER NOT NULL,
    "resource_id" INTEGER NOT NULL,
    "file_kind" "FileKind" NOT NULL,
    "file_name" TEXT,
    "file_type" "FileType",
    "object_key" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "fms_file_pkey" PRIMARY KEY ("fid","file_kind")
);

-- CreateTable
CREATE TABLE "pms_product" (
    "product_id" SERIAL NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "serial_number" VARCHAR(64) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT -1,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "note" TEXT NOT NULL DEFAULT '',
    "stock" INTEGER NOT NULL DEFAULT 0,
    "low_stock" INTEGER NOT NULL DEFAULT 0,
    "weight" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "keyword" TEXT NOT NULL DEFAULT '',
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "original_price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "promotion_price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "publish_status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "new_status" "NewStatus" NOT NULL DEFAULT 'NEW',
    "verify_status" "VERIFY_STATUS" NOT NULL DEFAULT 'UNVERIFIED',

    CONSTRAINT "pms_product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "pms_sku" (
    "sku_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sku_code" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "promotion_price" DECIMAL(65,30) NOT NULL,
    "original_price" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL,
    "low_stock" INTEGER NOT NULL,
    "attribute" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "pms_sku_pkey" PRIMARY KEY ("sku_id","product_id")
);

-- CreateTable
CREATE TABLE "pms_brand" (
    "brand_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "product_cnt" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT -1,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "keyword" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "pms_brand_pkey" PRIMARY KEY ("brand_id")
);

-- CreateTable
CREATE TABLE "pms_category" (
    "category_id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL DEFAULT '',
    "level" INTEGER NOT NULL DEFAULT 1,
    "product_cnt" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "keyword" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT -1,
    "parent_id" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "pms_category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "pms_album" (
    "album_id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "album_item_cnt" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT -1,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "pms_album_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "ums_admin" (
    "admin_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "create_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_ts" TIMESTAMP(3) NOT NULL,
    "create_id" INTEGER NOT NULL DEFAULT -1,
    "update_id" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "ums_admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "ums_user" (
    "user_id" INTEGER NOT NULL,
    "name" TEXT DEFAULT '',
    "username" TEXT NOT NULL,
    "phone" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "gender" "Gender",
    "birthday" TIMESTAMP(3),

    CONSTRAINT "ums_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ams_user_email_key" ON "ams_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ams_admin_email_key" ON "ams_admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ams_admin_session_session_token_key" ON "ams_admin_session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "ams_admin_authenticator_credential_id_key" ON "ams_admin_authenticator"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "fms_file_object_key_key" ON "fms_file"("object_key");

-- CreateIndex
CREATE UNIQUE INDEX "ums_admin_username_key" ON "ums_admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ums_user_username_key" ON "ums_user"("username");

-- AddForeignKey
ALTER TABLE "ams_admin_account" ADD CONSTRAINT "ams_admin_account_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "ams_admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ams_admin_session" ADD CONSTRAINT "ams_admin_session_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "ams_admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ams_admin_authenticator" ADD CONSTRAINT "ams_admin_authenticator_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "ams_admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pms_product" ADD CONSTRAINT "pms_product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "pms_brand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pms_product" ADD CONSTRAINT "pms_product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "pms_category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pms_category" ADD CONSTRAINT "pms_category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "pms_category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ums_admin" ADD CONSTRAINT "ums_admin_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "ams_admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ums_user" ADD CONSTRAINT "ums_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "ams_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
