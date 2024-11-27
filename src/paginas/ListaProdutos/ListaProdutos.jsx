import Principal from '../../comum/componentes/Principal/Principal';
import './ListaProdutos.css';

const ListaProdutos = () => {
  const produtos = [
    {
      nome: 'Smartphone Samsung',
      preco: 2999,
      cores: ['#29d8d5', '#252a34', '#fc3766'],
    },
    {
      nome: 'Xiaomi PocoPhone',
      preco: 5789,
      cores: ['#29d8d5', '#f37c59', '#ffd045'],
    },
    {
      nome: 'Xiaomi Poco Watch',
      preco: 4999,
      cores: ['#ffd045', '#d4394b', '#f37c59'],
    },
    {
      nome: 'Xiaomi Poco Pods',
      preco: 1499,
      cores: ['#365069', '#47c1c8', '#f95786'],
    },
  ];

  return (
    <Principal titulo="Lista de Produtos" voltarPara="/">
      {produtos.map((itemProduto, index) => {
        return (
          <div key={index} className="lista-produtos_item">
            <span>
              <strong>Nome: </strong>
              {itemProduto.nome}
            </span>
            <span>
              <strong>Preço: </strong>
              {itemProduto.preco}
            </span>
            <span>
              <strong>Cores: </strong>
              <div className="lista-produtos_cores">
                {itemProduto.cores.map((cor, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: cor,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                      }}
                    />
                  );
                })}
              </div>
            </span>
          </div>
        );
      })}
    </Principal>
  );
};

export default ListaProdutos;
