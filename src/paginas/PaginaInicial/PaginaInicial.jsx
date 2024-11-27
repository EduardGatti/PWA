import { useNavigate } from 'react-router-dom';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import './PaginaInicial.css';

const PaginaInicial = () => {
  const navigate = useNavigate();

  return (
    <Principal titulo="Página Inicial">
      <BotaoCustomizado aoClicar={() => navigate('/lista-produtos')}>Lista Produtos</BotaoCustomizado>

      <BotaoCustomizado cor="secundaria" aoClicar={() => navigate('/lista-tarefas')}>
        Lista de Tarefas
      </BotaoCustomizado>

      <BotaoCustomizado cor="primaria" aoClicar={() => navigate('/lista-clientes')}>
        Lista de Clientes
      </BotaoCustomizado>
    </Principal>
  );
};

export default PaginaInicial;
