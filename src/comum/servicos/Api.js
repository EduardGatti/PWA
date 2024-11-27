import axios from "axios";
import ServicoAutenticacao from "./ServicoAutenticacao";

const instanciaApi = axios.create({
    baseURL: "http://localhost:3000"
});
instanciaApi.interceptors.request.use((config) => {
    const _servicoUsuarios = new ServicoAutenticacao()
    const usuarioLogado = _servicoUsuarios.buscarUsuarioLogado();

    if (usuarioLogado) {

        config.headers["x-usuario"] = usuarioLogado.id;
    }
    return config;
});

export default instanciaApi;