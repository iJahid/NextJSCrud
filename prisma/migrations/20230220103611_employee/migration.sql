-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "empid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "gender" TEXT NOT NULL DEFAULT 'M',
    "status" INTEGER NOT NULL DEFAULT 0,
    "relegion" INTEGER NOT NULL DEFAULT 0,
    "address" TEXT,
    "prmaddress" TEXT,
    "bloodgrp" TEXT,
    "lasteducation" TEXT,
    "joiningdate" TIMESTAMP(3),
    "dateofregular" TIMESTAMP(3),
    "dob" TIMESTAMP(3),
    "designation" TEXT,
    "tin" TEXT,
    "nid" TEXT,
    "phone" TEXT,
    "married" TEXT DEFAULT 'U',
    "email" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_empid_key" ON "Employee"("empid");
