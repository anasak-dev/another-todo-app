import { PrismaClient } from "@prisma/client";
// using ES6 modules
import fetch from "isomorphic-unfetch";
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

    const user = await prisma.user
      .create({
        data: { name: fields.name, email: fields.email },
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
