const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "segredo";

exports.register = async (req, res) => {
  const { email, senha } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  db.run(
    "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
    [email, hash],
    function (err) {
      if (err) return res.status(400).json({ erro: "Usuário já existe" });
      res.json({ id: this.lastID });
    }
  );
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, user) => {
    if (!user) return res.status(400).json({ erro: "Usuário não encontrado" });

    const ok = await bcrypt.compare(senha, user.senha);

    if (!ok) return res.status(401).json({ erro: "Senha inválida" });

    const token = jwt.sign({ id: user.id }, SECRET);
    res.json({ token });
  });
};