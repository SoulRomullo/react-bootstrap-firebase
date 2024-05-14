import React from "react";
import './navbar.css';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

function Navbar() {

    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <i className="fa-regular fa-face-smile-wink fa-2x text-white"></i>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    {/* 
                        <span className="navbar-toggler-icon"></span>
                    */}
                    {/* 
                        Como usar um toggler icon externo do site font awesome
                        Lembrando que devemos colocar o link no index.html na pasta public
                        Segue o exemplo abaixo 
                    */}
                    <i class="fa-sharp fa-solid fa-bars text-white"></i>

                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-3">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        {
                            useSelector(state => state.usuarioLogado) > 0 ?
                                <>
                                    <li className="navbar-nav">
                                        <Link className="nav-link " aria-current="page" to="/eventocadastro">Publicar Evento</Link>
                                    </li>
                                    <li className="navbar-nav">
                                        <Link className="nav-link " aria-current="page" to="">Meus Eventos</Link>
                                    </li>
                                    <li className="navbar-nav">
                                        <Link className="nav-link " aria-current="page" onClick={() => dispatch({ type: 'LOG_OUT' })}>Sair</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="navbar-nav">
                                        <Link className="nav-link " aria-current="page" to="/novousuario">Cadastrar</Link>
                                        <Link className="nav-link " aria-current="page" to="/login">Login</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;