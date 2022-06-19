-- CreateTable
CREATE TABLE "Heardle" (
    "id" SERIAL NOT NULL,
    "artist" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Heardle_pkey" PRIMARY KEY ("id")
);
