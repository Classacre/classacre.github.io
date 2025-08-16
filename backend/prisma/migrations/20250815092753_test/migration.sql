-- AlterTable
ALTER TABLE "public"."messages" ADD COLUMN     "iv" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."sources" ADD COLUMN     "iv" TEXT NOT NULL DEFAULT '';
