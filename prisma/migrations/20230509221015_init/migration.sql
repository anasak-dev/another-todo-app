-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TEXT,
    "priority" TEXT NOT NULL,
    "status" TEXT DEFAULT 'in progress',
    "category" TEXT DEFAULT 'general',

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
