import React, { useState } from "react";
import './usuario-recuperar-senha.css';
import Navbar from '../../components/navbar'

import firebase from '../../config/firebase';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
function UsuarioRecuperarSenha() {

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();
    const auth = getAuth(firebase);

    function RecuperarSenha() {
        sendPasswordResetEmail(auth, email).then(resultado => {
            setMsg('Enviamos um link para seu email para você redefinir sua senha!');
        }).catch(erro => {
            setMsg('Verifique se o email está correto!')
        })
    }

    return(
        <>
            <Navbar/>
                <form className="text-center form-login mx-auto mt-5">
                    <h3 className="mb-3 fw-bold">Recuperar Senha</h3>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"></input>

                    <div className="msg my-4 text-center">
                        <span>{msg}</span>
                    </div>

                    <button onClick={RecuperarSenha} type="button" className="btn btn-lg btn-block btn-enviar">Recuperar Senha</button>
                </form>
        </>
    )
}

export default UsuarioRecuperarSenha;

