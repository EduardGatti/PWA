import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import VerificarAutenticacao from './comum/componentes/VerificarAutenticacao/VerificarAutenticacao';
import PaginaCadastroCliente from './paginas/PaginaCadastroCliente/PaginaCadastroCliente';
import PaginaInicial from './paginas/PaginaInicial/PaginaInicial';
import PaginaListaClientes from './paginas/PaginaListaClientes/PaginaListaClientes';
import PaginaLogin from './paginas/PaginaLogin/PaginaLogin';
import PaginaMeuPerfil from './paginas/PaginaMeuPerfil/PaginaMeuPerfil';
import PaginaNovoUsuario from './paginas/PaginaNovoUsuario/PaginaNovoUsuario';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <PaginaLogin />,
  },
  {
    path: 'novo-usuario',
    element: <PaginaNovoUsuario />,
  },
  {
    path: '',
    element: <VerificarAutenticacao />,
    children: [
      // Rotas privadas da app
      {
        path: '',
        element: <PaginaInicial />,
      },
      {
        path: 'lista-clientes',
        element: <PaginaListaClientes />,
      },
      {
        path: 'cadastro-cliente/:id?',
        element: <PaginaCadastroCliente />,
      },
      {
        path: 'meu-perfil',
        element: <PaginaMeuPerfil />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
