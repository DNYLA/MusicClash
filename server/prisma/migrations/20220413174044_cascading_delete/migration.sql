-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_setId_fkey";

-- DropForeignKey
ALTER TABLE "TrackSet" DROP CONSTRAINT "TrackSet_clashId_fkey";

-- AddForeignKey
ALTER TABLE "TrackSet" ADD CONSTRAINT "TrackSet_clashId_fkey" FOREIGN KEY ("clashId") REFERENCES "Clash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_setId_fkey" FOREIGN KEY ("setId") REFERENCES "TrackSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
