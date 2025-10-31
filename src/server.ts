import "dotenv/config";
import express from "express";
import { router } from "@shared/routes";
import { connectToDatabase } from "@database/connection";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use("/api", router);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(` Servidor executando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error(" Erro ao conectar ao banco: ", err);
    process.exit(1);
  });
