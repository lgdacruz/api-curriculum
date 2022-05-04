import { Router, Request, Response } from "express";
import FeedBack, { UserModel } from "./DynamoDB";
import Nodemailer from "nodemailer";

const route = Router();
const transport = Nodemailer.createTransport({
 service: "Hotmail",
 auth: {
  user: process.env.HOTMAIL_LOGIN,
  pass: process.env.HOTMAIL_PASSWORD,
 },
});

route.post("/message", async (req: Request, res: Response) => {
 const { text } = req.body;
 try {
  if (!text || text === "") return res.status(400).send("Não há mensagem");
  transport.sendMail({
   from: process.env.HOTMAIL_LOGIN,
   to: process.env.GMAIL_LOGIN,
   subject: "FeedBack currículo",
   html: `<p>${text}</p>`,
  });

  return res.status(200).send("Mensagem enviada com sucesso!");
 } catch (e) {
  console.log(e);
 }
});

// route.get("/", async (req: Request, res: Response) => {
//  try {
//   const feedbacks = await FeedBack.scan().exec();
//   return res.status(200).send(feedbacks);
//  } catch (e) {
//   console.log(e);
//  }
// });

// route.post("/user", async (req: Request, res: Response) => {
//  const { nome, segundoNome, idade } = req.body;

//  try {
//   await UserModel.create({ name: nome, SecondName: segundoNome, age: idade });
//   return res.status(200).send("Usuário criado com sucesso!");
//  } catch (e) {
//   console.log(e);
//  }
// });

//gerar numero aleatório

export default route;
