import React, { useState } from "react";
import { useSelector } from 'react-redux';
import './evento-cadastro.css';

import Navbar from '../../components/navbar'

import firebase from '../../config/firebase'
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';

function EventoCadastro() {

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [foto, setFoto] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const db = firebase;
    const firestore = getFirestore(db);
    const eventosColecao = collection(firestore, 'eventos');
    const storage = getStorage(db);

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        const docData = {
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            hora: hora,
            usuario: usuarioEmail,
            visualizacoes: 0,
            foto: foto.name,
            publico: 1,
            criacao: new Date(),
        }

        const storageRef = ref(storage, `imagens/${foto.name}`);

        uploadBytes(storageRef, foto);

        addDoc(eventosColecao, docData).then(() => {
            setMsgTipo('sucesso')
            setCarregando(0);

        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')

        });
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid col-12 mt-5 m-auto">
                <div className="row m-auto">
                    <h3 className="fw-bold text-center">Novo Evento</h3>
                </div>

                <form>
                    <div className="form-group mt-3 mb-5 px-5">
                        <label>Título:</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control"></input>
                    </div>

                    <div className="form-group mt-3 mb-5 px-5">
                        <label>Tipo do Evento:</label>
                        <select className="form-control" onChange={(e) => setTipo(e.target.value)}>
                            <option disabled selected value>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>

                    <div className="form-group mt-3 mb-3 px-5">
                        <label>Descrição do Evento:</label>
                        <textarea className="form-control" onChange={(e) => setDetalhes(e.target.value)} rows="3" />
                    </div>

                    <div className="form-group mt-3 mb-3 px-5 row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input type="date" className="form-control" onChange={(e) => setData(e.target.value)} />
                        </div>

                        <div className="col-6">
                            <label>Hora:</label>
                            <input type="time" className="form-control" onChange={(e) => setHora(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group mt-3 mb-3 px-5">
                        <label>Upload da Foto:</label>
                        <input type="file" onChange={(e) => setFoto(e.target.files[0])} className="form-control"></input>
                    </div>

                    <div className="form-group mt-3 mb-3 px-5">
                        <div className="row">
                            {
                                carregando > 0 ?
                                    <div class="spinner-border text-danger mx-auto" role="status"><span class="visually-hidden">Loading...</span></div> :
                                    <button type="button" onClick={cadastrar} className="btn btn-lg btn-block mt-3 mb-3 btn-cadastro">Publicar Evento</button>
                            }
                        </div>
                    </div>
                </form>
                <div className="msg-login text-center mt-2">

                    {msgTipo === 'sucesso' && <span><strong>Wow!</strong> Evento Publicado &#128526;</span>}

                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar o evento! &#128546;</span>}

                </div>
            </div>
        </>

    );
};

export default EventoCadastro;