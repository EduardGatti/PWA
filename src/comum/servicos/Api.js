import axios from 'axios';
import ServicoAutenticacao from './ServicoAutenticacao';

const instanciaApi = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: "https://shinpee-api.onrender.com"
});

instanciaApi.interceptors.request.use((config) => {
  const _servicoAutenticacao = new ServicoAutenticacao();

  const usuarioLogado = _servicoAutenticacao.buscarUsuarioLogado();
  if (usuarioLogado) {
    config.headers['x-usuario'] = usuarioLogado.id;
  }

  return config;
});

export default instanciaApi;
