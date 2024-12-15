const express = require("express");
const router = express.Router();
const {
  ListarUsuarios,
  buscaUsuarioId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("../controllers/usuarios-controllers");

// Rotas
router.get("/", ListarUsuarios);
router.get("/:id", buscaUsuarioId);
router.post("/", criarUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

module.exports = router;
