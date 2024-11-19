-- CreateTable
CREATE TABLE "todo" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "status" TEXT DEFAULT '未着手',
    "limit" DATE,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
