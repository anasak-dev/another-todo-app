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
    const [id, status] = [fields.id, fields.status];
    const user = await prisma.todo
      .update({
        where: {
          id,
        },
        data: {
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
