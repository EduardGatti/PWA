import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Principal from '../../comum/componentes/Principal/Principal';
import ServicoCliente from '../../comum/servicos/ServicoCliente';
import './PaginaListaClientes.css';

const instanciaServicoCliente = new ServicoCliente();

const PaginaListaClientes = () => {
  const navigate = useNavigate();
  const [listaClientes, setListaClientes] = useState([]);

  useEffect(() => {
    const buscarClientes = async () => {
      const response = await instanciaServicoCliente.listar();
      setListaClientes(response.data);
    };

    buscarClientes();
  }, []);

  const navegarParaEdicao = (idCliente) => {
    navigate(`/cadastro-cliente/${idCliente}`);
  };

  const excluir = (idCliente) => {
    if (confirm('Tem certeza?')) {
      const listaAtualizada = instanciaServicoCliente.excluirCliente(idCliente);
      setListaClientes(listaAtualizada);
    }
  };

  return (
    <Principal titulo="Lista de Clientes" voltarPara="/">
      <Link to="/cadastro-cliente">Novo</Link>

      {listaClientes.map((cliente) => {
        return (
          <div key={cliente.id} className="pagina-lista-clientes__item-cliente">
            {cliente.nome}

            <div className="pagina-lista-clientes__item-cliente-acoes">
              <FaEdit size={24} onClick={() => navegarParaEdicao(cliente.id)} />

              <FaTrash size={24} color="red" onClick={() => excluir(cliente.id)} />
            </div>
          </div>
        );
      })}
    </Principal>
  );
};

export default PaginaListaClientes;
