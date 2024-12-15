const express = require("express");
const router = express.Router();
const {
  listarlivros,
  buscarlivroPorId,
  cadastralivro,
  atualizarLivro,
  deletarLivro,
} = require("../controllers/livro-controllers");

// Rotas
router.get("/", listarlivros);
router.get("/:id", buscarlivroPorId);
router.post("/", cadastralivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", deletarLivro);

module.exports = router;
