import { useState } from 'react';
import Principal from '../../comum/componentes/Principal/Principal';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import { toast } from 'react-toastify';
import ServicoUsuarios from '../../comum/servicos/ServicoUsuarios';
import { useNavigate } from 'react-router-dom';

const instanciaServicoUsuarios = new ServicoUsuarios();

const PaginaNovoUsuario = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = async () => {
    try {

      if (!nome || !email || !senha) {
        toast.error('Preencha todos os campos.');
        return;
      }

      const usuario = {
        nome,
        email,
        senha,
      };

      await instanciaServicoUsuarios.cadastrarUsuario(usuario);
      toast.success('Cadastro criado com sucesso.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data)
    }
  };

  return (
    <Principal titulo="Novo Usuário" voltarPara="/login">
      <div className="campo">
        <label>Nome</label>
        <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div className="campo">
        <label>Email</label>
        <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="campo">
        <label>Senha</label>
        <input
          type="password"
          placeholder="Digite uma senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <BotaoCustomizado cor="secundaria" aoClicar={cadastrar}>
        Cadastrar
      </BotaoCustomizado>
    </Principal>
  );
};

export default PaginaNovoUsuario;
