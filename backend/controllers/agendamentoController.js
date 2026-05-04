const db = require("../database/db");

exports.criar = (req, res) => {
  const { nome, data } = req.body;

  db.run(
    "INSERT INTO agendamentos (nome, data) VALUES (?, ?)",
    [nome, data],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, nome, data });
    }
  );
};

exports.listar = (req, res) => {
  db.all("SELECT * FROM agendamentos", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.deletar = (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM agendamentos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ sucesso: true });
  });
};