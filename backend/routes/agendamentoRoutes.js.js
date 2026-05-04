const express = require("express");
const router = express.Router();
const controller = require("../controllers/agendamentoController");

router.post("/", controller.criar);
router.get("/", controller.listar);
router.delete("/:id", controller.deletar);

module.exports = router;