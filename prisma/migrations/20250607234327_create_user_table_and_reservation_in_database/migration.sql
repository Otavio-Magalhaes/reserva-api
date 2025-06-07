-- CreateEnum
CREATE TYPE "StatusReservation" AS ENUM ('active', 'cancelled');

-- CreateEnum
CREATE TYPE "StatusTable" AS ENUM ('available', 'reserved', 'inactive');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('client', 'admin');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "StatusTable" NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,
    "data_reservation" TIMESTAMP(3) NOT NULL,
    "status" "StatusReservation" NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
