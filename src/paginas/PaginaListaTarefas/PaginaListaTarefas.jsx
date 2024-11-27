import './PaginaListaTarefas.css';
import { useState } from 'react';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';

import { FaTrashCan } from 'react-icons/fa6';

const PaginaListaTarefas = () => {
  const [descricao, setDescricao] = useState('');
  const [tarefas, setTarefas] = useState([]);

  const adicionarNaLista = () => {
    if (descricao && descricao.trim()) {
      tarefas.push({ descricao, feita: false });
      setTarefas([...tarefas]);
    } else {
      alert('Preencha o campo Descrição');
    }
    setDescricao('');
    document.getElementById('campoDescricao').focus();
  };

  const removerDaLista = (index) => {
    if (
      confirm(
        `Tem certeza que deseja excluir: ${tarefas[index].descricao}`
      )
    ) {
      if (tarefas[index].feita) {
        tarefas.splice(index, 1);
        setTarefas([...tarefas]);
      } else {
        alert(
          'A tarefa precisa estar concluída para ser excluida'
        );
      }
    }
  };

  const marcarComoFeita = (index) => {
    const tarefaEdicao = tarefas[index];
    tarefas[index] = {
      ...tarefaEdicao,
      feita: !tarefaEdicao.feita,
    };

    setTarefas([...tarefas]);
  };

  return (
    <Principal
      titulo={`Lista de Tarefas (${tarefas.length})`}
      voltarPara="/"
    >
      <div className="pagina-lista-tarefas_campo-descricao">
        <input
          id="campoDescricao"
          type="text"
          placeholder="Descrição da tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              adicionarNaLista();
            }
          }}
        />
        <BotaoCustomizado
          cor="secundaria"
          aoClicar={adicionarNaLista}
        >
          +
        </BotaoCustomizado>
      </div>
      {tarefas.map((item, index) => {
        return (
          <div
            key={index}
            className="pagina-lista-tarefas_item"
          >
            <input
              type="checkbox"
              checked={item.feita}
              onChange={() => marcarComoFeita(index)}
            />
            <span
              style={{
                textDecoration: item.feita
                  ? 'line-through'
                  : 'none',
              }}
            >
              {item.descricao}
            </span>
            <FaTrashCan
              color="red"
              onClick={() => removerDaLista(index)}
            />
          </div>
        );
      })}

      {tarefas.length === 0 && (
        <span className="pagina-lista-tarefas_mensagem-vazia">
          Não tem tarefa para listar.
        </span>
      )}
    </Principal>
  );
};

export default PaginaListaTarefas;
