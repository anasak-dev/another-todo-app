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
    const [title, description, dueDate, priority, status] = [
      fields.title,
      fields.description,
      fields.dueDate,
      fields.priority,
      fields.status,
    ];
    const user = await prisma.todo
      .create({
        data: {
          title,
          description,
          dueDate,
          priority,
          status,
        },
      })
      .catch((e) => {
        res.status(500).send({ error: e });
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.status(200).send(user);
  });
}
