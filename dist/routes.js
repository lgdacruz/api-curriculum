"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const route = (0, express_1.Router)();
const transport = nodemailer_1.default.createTransport({
    service: "Hotmail",
    auth: {
        user: process.env.HOTMAIL_LOGIN,
        pass: process.env.HOTMAIL_PASSWORD,
    },
});
route.post("/message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    try {
        if (!text || text === "")
            return res.status(400).send("Não há mensagem");
        transport.sendMail({
            from: process.env.HOTMAIL_LOGIN,
            to: process.env.GMAIL_LOGIN,
            subject: "FeedBack currículo",
            html: `<p>${text}</p>`,
        });
        return res.status(200).send("Mensagem enviada com sucesso!");
    }
    catch (e) {
        console.log(e);
    }
}));
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
exports.default = route;
