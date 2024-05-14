import React, { useState } from "react";
import './login.css'
import { Link, Navigate } from "react-router-dom";

import firebase from '../../config/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useSelector, useDispatch } from 'react-redux';

function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();

    const dispatch = useDispatch();


    function logar() {
        const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, email, senha).then(resultado => {
            setMsgTipo('sucesso');
            setTimeout(() => {
                dispatch({ type: 'LOG_IN', usuarioEmail: email });
            }, 2000);
        }).catch(erro => {
            setMsgTipo('erro');
        });
    }



    return (
        <div className="login-content d-flex align-items-center">

            {useSelector(state => state.usuarioLogado) > 0 ? <Navigate to='/' /> : null}

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <i class="fa-regular fa-face-smile-wink fa-5x text-white"></i>
                    <h1 className="h3 mb-3 text-white fw-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-3" id="inputEmail" placeholder="Email" />

                <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-3" id="inputPassword" placeholder="Senha" />

                <button onClick={logar} className="btn btn-login w-100 py-2" type="button">Logar</button>

                <div class="msg-login text-white text-center my-5">

                    {msgTipo === 'sucesso' && <span><strong>Wow!</strong>Você está conectado &#128526;</span>}

                    {msgTipo === 'erro' && <span><strong>Ops!</strong>Verifique se a senha ou usuário estão corretos! &#128546;</span>}

                </div>

                <div className="opcoes-login mt-5 text-center">
                    <Link to='/usuariorecuperarsenha' className="mx-2">Recuperar senha</Link>
                    <span className="text-white">&#9733;</span>
                    <Link to='/novousuario' className="mx-2">Quero cadastrar</Link>
                </div>

            </form>
        </div >
    );
}

export default Login;