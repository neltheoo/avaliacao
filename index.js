const express = require("express");
const cors = require("cors");
const livrosRoutes = require("./routes/livro-routes"); // Importando as rotas de usuários
const usuariosRoutes = require("./routes/usuario-routes");
const emprestimosRoutes = require("./routes/emprestimo-routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Usando as rotas de usuários
app.use("/api/livros", livrosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/emprestimos", emprestimosRoutes); 

console.log ("emprestimosRoutes")

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
