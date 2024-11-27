import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './Cabecalho.css';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

function Cabecalho() {
  const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

  return (
    <header className="cabecalho_root">
      <Link to="/">
        <img src="/vite.svg" height={40} />
      </Link>

      {usuarioLogado && (
        <Link to="/meu-perfil">
          <Avatar nome={usuarioLogado.nome} />
        </Link>
      )}
    </header>
  );
}

export default Cabecalho;
