import ConexaoMySql from "../database/ConexaoMySql.js";


class AutenticacaoController {

    async login(req, resp) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {

                resp.status(400).send("Email e senha são obrigatórios.");
                return;

            }
            const conexao = await new ConexaoMySql().getConexao();
            const comandoSql = "SELECT * FROM usuarios WHERE email = ? AND senha = md5(?);";
            const [resultado] = await conexao.execute(comandoSql, [email, senha]);
            const usuarioEncontrado = resultado[0]

            if (!usuarioEncontrado) {
                resp.status(401).send('Email ou  Senha incorreta.')
                return;
            }

            delete usuarioEncontrado.senha
            resp.send(usuarioEncontrado);
        } catch (error) {
            resp.status(500).send(error);
        }
    }

}


export default AutenticacaoController;