-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DR', 'CR');

-- CreateEnum
CREATE TYPE "SupportReason" AS ENUM ('GI', 'FR', 'TS', 'IS');

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'United States - USD',
    "subscribed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "portfolioName" TEXT NOT NULL,
    "portfolioNameHash" TEXT,
    "ownerEmail" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "transactionName" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "comments" TEXT,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Support" (
    "id" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" "SupportReason" NOT NULL,
    "concern" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "ownerEmail" TEXT NOT NULL,

    CONSTRAINT "Support_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL,
    "comments" TEXT,
    "ownerEmail" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ref" (
    "id" TEXT NOT NULL,
    "visited" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],

    CONSTRAINT "Ref_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_portfolioName_key" ON "Portfolio"("portfolioName");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_portfolioNameHash_key" ON "Portfolio"("portfolioNameHash");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_ownerEmail_portfolioName_key" ON "Portfolio"("ownerEmail", "portfolioName");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionName_type_transactionDate_amount_por_key" ON "Transaction"("transactionName", "type", "transactionDate", "amount", "portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "Support_ownerEmail_concern_reason_key" ON "Support"("ownerEmail", "concern", "reason");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_ownerEmail_rating_comments_key" ON "Feedback"("ownerEmail", "rating", "comments");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Support" ADD CONSTRAINT "Support_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
