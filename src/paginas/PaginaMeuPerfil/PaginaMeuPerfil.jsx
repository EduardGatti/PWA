import { useNavigate } from 'react-router-dom';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import ServicoAutenticacao from '../../comum/servicos/ServicoAutenticacao';
import Avatar from '../../comum/componentes/Avatar/Avatar';
import { useState } from 'react';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

const PaginaMeuPerfil = () => {
  const navigate = useNavigate();
  const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

  const [imagemUsuario, setImagemUsuario] = useState('');

  const sair = () => {
    instanciaServicoAutenticacao.sair();
    navigate('/login');
  };

  const mudarAvatar = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64String = event.target.result;

        setImagemUsuario(base64String);
        console.log('##### Usuário:', { ...usuarioLogado, foto: base64String });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Principal titulo="Meu Perfil" voltarPara="/">
      <input
        type="file"
        accept="image/*"
        multiple={false}
        id="fileInput"
        style={{ display: 'none' }}
        onChange={mudarAvatar}
      />
      <button
        onClick={() => document.getElementById('fileInput').click()}
        style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', justifyContent: 'center' }}
      >
        <Avatar nome={usuarioLogado.nome} perfil={true} imagem={imagemUsuario} />
      </button>

      <div className="campo">
        <label>Nome</label>
        <input type="text" value={usuarioLogado.nome} disabled />
      </div>

      <div className="campo">
        <label>Email</label>
        <input type="text" value={usuarioLogado.email} disabled />
      </div>

      <BotaoCustomizado aoClicar={sair}>Sair</BotaoCustomizado>
    </Principal>
  );
};

export default PaginaMeuPerfil;
