-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clash" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "primarySetId" INTEGER NOT NULL,
    "secondarySetId" INTEGER NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "Clash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackSet" (
    "id" SERIAL NOT NULL,
    "clashId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "TrackSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,
    "setId" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("setId","position")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clash_primarySetId_key" ON "Clash"("primarySetId");

-- AddForeignKey
ALTER TABLE "Clash" ADD CONSTRAINT "Clash_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackSet" ADD CONSTRAINT "TrackSet_clashId_fkey" FOREIGN KEY ("clashId") REFERENCES "Clash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_setId_fkey" FOREIGN KEY ("setId") REFERENCES "TrackSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
