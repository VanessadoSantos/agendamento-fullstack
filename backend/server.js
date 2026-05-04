const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let agendamentos = [];

app.post("/agendamentos", (req, res) => {
  const { nome, data } = req.body;

  const novo = { id: Date.now(), nome, data };
  agendamentos.push(novo);

  res.json(novo);
});

app.get("/agendamentos", (req, res) => {
  res.json(agendamentos);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});