import React, { useState } from "react";

import firebase from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import './usuario-novo.css';

import Navbar from '../../components/navbar'

function NovoUsuario() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();


    function cadastrar() {

        setCarregando(1);

        setMsgTipo(null);

        if (!email || !senha) {
            setMsgTipo('erro');
            setMsg('Você precisa informar o email e senha para fazer o cadastro!');
            setCarregando(0)
            return;
        }

        const auth = getAuth(firebase);
        createUserWithEmailAndPassword(auth, email, senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso');
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')
            switch (erro.message) {
                case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                    setMsg('A senha deve ter pelo menos 6 caracteres!');
                    break;
                case 'Firebase: Error (auth/email-already-in-use).':
                    setMsg('Este e-mail já está sendo usado por outro usuário!');
                    break;
                case 'Firebase: Error (auth/invalid-email).':
                    setMsg('O formato do seu email é inválido!');
                    break;
                default:
                    setMsg('Não foi possível cadastrar. Tente novamente mais tarde!')
            }
        })

    }

    return (
        <>
            <Navbar />
            <div className="from-cadastro">
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mb-3 text-black fw-bold">Cadastro</h1>

                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />
                    <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha" />

                    {
                        carregando ? <div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div> :
                            <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                    }

                    <div class="msg-login text-black text-center my-5">

                        {msgTipo === 'sucesso' && <span><strong>Wow!</strong> Usuário cadastrado com sucesso! &#128526;</span>}

                        {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}

                    </div>
                </form>
            </div>
        </>
    )
}

export default NovoUsuario;