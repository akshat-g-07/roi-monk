-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'DODO',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "providerSubscriptionId" TEXT,
    "currentPeriodEnd" TIMESTAMP(3),
    "amount" INTEGER,
    "currency" TEXT,
    "ownerEmail" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessedWebhook" (
    "webhookId" TEXT NOT NULL,
    "type" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedWebhook_pkey" PRIMARY KEY ("webhookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_providerSubscriptionId_key" ON "Subscription"("providerSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_ownerEmail_key" ON "Subscription"("ownerEmail");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;