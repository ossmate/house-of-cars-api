-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isHighlighted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
