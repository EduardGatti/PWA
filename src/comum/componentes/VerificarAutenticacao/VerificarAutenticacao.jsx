import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

const VerificarAutenticacao = () => {
  const navigate = useNavigate();

  const usuarioEstaLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

  useEffect(() => {
    if (!usuarioEstaLogado) {
      navigate('/login');
    }
  }, [navigate, usuarioEstaLogado]);

  return usuarioEstaLogado ? <Outlet /> : null;
};

export default VerificarAutenticacao;
