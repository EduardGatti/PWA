import { useEffect, useState } from 'react';
import Principal from '../../comum/componentes/Principal/Principal';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import { toast } from 'react-toastify';
import ServicoUsuarios from '../../comum/servicos/ServicoUsuarios';
import { useNavigate, useParams } from 'react-router-dom';

import { formatarComMascara, MASCARA_CELULAR, MASCARA_CEP} from '../../comum/utils/mascaras';
import axios, { Axios } from 'axios';

const instanciaServicoUsuarios = new ServicoUsuarios();

const PaginaNovoUsuario = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [celular, setCelular] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  useEffect(() => {
    if (params.id) {
      const clienteEncontrado = instanciaServicoCliente.buscarPorId(params.id);
      if (clienteEncontrado) {
        setNome(clienteEncontrado.nome);
        setEmail(clienteEncontrado.email);
        setCelular(clienteEncontrado.celular);
        setDataNascimento(clienteEncontrado.dataNascimento);
      }
    }
  }, [params.id]);
  


  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const cadastrar = async () => {
    try {
      if (!nome || !email || !senha || !celular || !dataNascimento || !cep) {
        toast.error('Preencha todos os campos.');
        return;
      }

      const usuario = {
        nome,
        email,
        senha,
        celular,
        dataNascimento,
        cep
      };
      
      
      await instanciaServicoUsuarios.cadastrarUsuario(usuario);
      toast.success('Cadastro criado com sucesso.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error(error.response.data);
    }
  };

  const buscarCEP = async (event) => {
    try {
      const resp = await axios.get(`https://brasilapi.com.br/api/cep/v2/${event.target.value}`);

      setRua(resp.data.street || '');
      setBairro(resp.data.neighborhood || '');
      setCidade(resp.data.city || '');

      if (resp.data.street) {
        document.getElementById('campoNumero').focus();
      }
    } catch {
      toast.error('CEP não encontrado.');
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

      <div className="campo">
        <label>Celular</label>
        <input
          type="tel"
          placeholder="Digite o número do seu Whatsapp"
          value={celular}
          onChange={(e) => setCelular(formatarComMascara(e.target.value, MASCARA_CELULAR))}
        />
      </div>

      <div className="campo">
        <label>Data Nascimento</label>
        <input
          type="date"
          placeholder="Digite sua data de nascimento"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>CEP</label>
        <input
          type="tel"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(formatarComMascara(e.target.value, MASCARA_CEP))}
          onBlur={buscarCEP}
        />
      </div>
      <div className="campo">
        <label>Rua</label>
        <input
          type="text"
          placeholder="Digite sua rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          maxLength={100}
        />
      </div>
      <div className="campo">
        <label>Número</label>
        <input
          id="campoNumero"
          type="text"
          placeholder="Digite o número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          maxLength={100}
        />
      </div>
      <div className="campo">
        <label>Bairro</label>
        <input
          type="text"
          placeholder="Digite seu Bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          maxLength={100}
        />
      </div>
      <div className="campo">
        <label>Cidade</label>
        <input
          type="text"
          placeholder="Digite sua Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          maxLength={100}
        />
      </div>

      <BotaoCustomizado cor="secundaria" aoClicar={cadastrar}>
        Cadastrar
      </BotaoCustomizado>
    </Principal>
  );
};

export default PaginaNovoUsuario;
