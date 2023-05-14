import { PrismaClient } from "@prisma/client";
// https://github.com/node-formidable/formidable
const prisma = new PrismaClient();

export default async function (req, res) {
  const allTodos = await prisma.todo
    .findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.status(200).send(allTodos);
}
