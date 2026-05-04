const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Criar banco
const db = new sqlite3.Database("./database.db");

// Criar tabela
db.run(`
  CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data TEXT
  )
`);

// Criar agendamento
app.post("/agendamentos", (req, res) => {
  const { nome, data } = req.body;

  db.run(
    "INSERT INTO agendamentos (nome, data) VALUES (?, ?)",
    [nome, data],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ id: this.lastID, nome, data });
    }
  );
});

// Listar
app.get("/agendamentos", (req, res) => {
  db.all("SELECT * FROM agendamentos", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Deletar
app.delete("/agendamentos/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM agendamentos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ sucesso: true });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando com SQLite 🚀");
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const agendamentoRoutes = require("./routes/agendamentoRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/agendamentos", agendamentoRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando 🚀");
});