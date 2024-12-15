const express = require("express");
const router = express.Router();

const {
  listarEmprestimo,
  buscarEmprestimoPorId,
  cadastraEmprestimo,
  atualizarEmprestimo,
  deletarEmprestimo,
} = require("../controllers/emprestimo-controller");

// Rotas
router.get("/", listarEmprestimo);
router.get("/:id", buscarEmprestimoPorId);
router.post("/", cadastraEmprestimo);
router.put("/:id", atualizarEmprestimo);
router.delete("/:id", deletarEmprestimo);

module.exports = router;