import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import Routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Routes);

app.listen(process.env.PORT);
