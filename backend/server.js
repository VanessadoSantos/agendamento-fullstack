const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let agendamentos = [];

// Criar agendamento
app.post("/agendamentos", (req, res) => {
  const { nome, data } = req.body;

  const novo = {
    id: Date.now(),
    nome,
    data
  };

  agendamentos.push(novo);
  res.json(novo);
});

// Listar
app.get("/agendamentos", (req, res) => {
  res.json(agendamentos);
});

// Deletar
app.delete("/agendamentos/:id", (req, res) => {
  const id = Number(req.params.id);
  agendamentos = agendamentos.filter(a => a.id !== id);

  res.json({ mensagem: "Deletado" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});