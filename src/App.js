import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from '../src/store';
import { Provider } from 'react-redux';

/* Páginas */
import Home from './view/home';
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha';
import EventoCadastro from "./view/evento-cadastro";
import EventoDetalhes from './view/evento-detalhes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}> </Route>
          <Route path='/eventos/:parametro' element={<Home />}> </Route>
          <Route exact path='/login' element={<Login />}> </Route>
          <Route exact path='/novousuario' element={<NovoUsuario />}> </Route>
          <Route exact path='/usuariorecuperarsenha' element={<UsuarioRecuperarSenha />}> </Route>
          <Route exact path='/eventocadastro' element={<EventoCadastro />}> </Route>
          <Route path='/eventodetalhes/:id' element={<EventoDetalhes />}> </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
