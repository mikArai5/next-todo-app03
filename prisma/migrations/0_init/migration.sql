-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "status" TEXT DEFAULT '未着手',
    "limit" DATE,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "todo_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todo_title_key" ON "todo"("title");

-- CreateIndex
CREATE UNIQUE INDEX "comment_todo_id_key" ON "comment"("todo_id");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

