import cors from "cors";
import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";
import AutenticacaoController from "./controllers/AutenticacaoController.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
//Rota publicas
const _usuariosController = new UsuariosController();
const _autenticacaoController = new AutenticacaoController();
app.get("/usuarios", _usuariosController.listar);
app.post("/login", _autenticacaoController.login);
app.post("/usuarios", _usuariosController.adicionar);

app.use((req, resp, next) => {
  const usuarioLogado = req.headers["x-usuario"]
  if(!usuarioLogado){
    resp.status(401).send();
    return;
  }
next();
})



// Rotas privadas
app.put("/usuarios", _usuariosController.atualizar);
app.delete("/usuarios/:id", _usuariosController.excluir);

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
