import { useState } from 'react';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';

const BotaoContador = () => {
  const [numero, setNumero] = useState(0);

  const incrementar = () => {
    setNumero(numero + 1);
  };

  const decrementar = () => {
    setNumero(numero - 1);
  };

  return (
    <Principal titulo="Botão Contador" voltarPara="/">
      <BotaoCustomizado aoClicar={decrementar}>
        Menos Um
      </BotaoCustomizado>

      <h1>O número é: {numero}</h1>

      <BotaoCustomizado aoClicar={incrementar}>
        Mais Um
      </BotaoCustomizado>
    </Principal>
  );
};

export default BotaoContador;
