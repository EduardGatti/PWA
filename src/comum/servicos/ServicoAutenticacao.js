import instanciaApi from './Api';

class ServicoAutenticacao {
  async login(email, senha) {
    const response = await instanciaApi.post('/login', { email, senha });
    localStorage.setItem('usuario-logado', JSON.stringify(response.data));
  }

  buscarUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuario-logado');
    if (usuarioLogado) {
      return JSON.parse(usuarioLogado);
    }

    return undefined;
  }

  sair() {
    localStorage.removeItem('usuario-logado');
  }
}

export default ServicoAutenticacao;
