-- CreateEnum
CREATE TYPE "public"."PetSpecies" AS ENUM ('OTHER', 'DOG', 'CAT', 'BIRD', 'FISH');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('UNKNOWN', 'MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "public"."ServiceType" AS ENUM ('FLAT_RATE', 'HOURLY');

-- CreateEnum
CREATE TYPE "public"."PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE');

-- CreateTable
CREATE TABLE "public"."clients" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "gender" "public"."Gender" NOT NULL DEFAULT 'UNKNOWN',
    "address" TEXT,
    "zipCode" TEXT,
    "city" TEXT,
    "country" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" "public"."PetSpecies" NOT NULL,
    "breed" TEXT,
    "age" INTEGER NOT NULL,
    "gender" "public"."Gender" NOT NULL DEFAULT 'UNKNOWN',
    "weight" DOUBLE PRECISION,
    "Size" "public"."PetSize" NOT NULL,
    "description" TEXT,
    "CareInstructions" TEXT,
    "neutered" BOOLEAN NOT NULL DEFAULT false,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "microchipped" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER,
    "species" "public"."PetSpecies"[],
    "type" "public"."ServiceType" NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."appointments" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."pets" ADD CONSTRAINT "pets_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
