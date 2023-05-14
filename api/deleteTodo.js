import { PrismaClient } from "@prisma/client";
// https://github.com/node-formidable/formidable
import formidable from "formidable";
const prisma = new PrismaClient();

export default async function (req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).send(fields);
      return;
    }
    const todo = await prisma.todo
      .delete({
        where: {
          id: parseInt(fields.id),
        },
      })
      .catch((e) => {
        res.status(500).send({ error: e });
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.status(200).send(todo);
  });
}
