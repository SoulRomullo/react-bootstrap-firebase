import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './evento-detalhes.css';
import Navbar from "../../components/navbar";
import { Link, useParams, Navigate } from "react-router-dom";

import firebase from '../../config/firebase';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, deleteObject } from "firebase/storage";

function EventoDetalhes() {
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const { id } = useParams();
    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState('');
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(0);
    const storage = getStorage(firebase);

    async function remover() {
        try {
            const db = getFirestore(firebase);
            const collectionRef = doc(db, 'eventos', id);

            // Removendo a Foto
            const eventoDoc = await getDoc(collectionRef);
            if (eventoDoc.exists()) {
                const dataFoto = eventoDoc.data().foto;
                if (dataFoto) {
                    const storageRef = ref(storage, `imagens/${dataFoto}`);
                    await deleteObject(storageRef);
                }
            }

            // Removendo os Dados 
            await deleteDoc(collectionRef);
            setExcluido(1);
        } catch (error) {
            console.error("Erro ao remover o evento:", error);
        }
    }

    useEffect(() => {
        const fetchEvento = async () => {
            const db = getFirestore(firebase);
            const collectionRef = doc(db, 'eventos', id);
            const eventoGet = await getDoc(collectionRef);
            if (eventoGet.exists()) {
                const eventData = eventoGet.data();
                setEvento(eventData);
                const newVisualizacoes = eventData.visualizacoes + 1;
                await updateDoc(collectionRef, { visualizacoes: newVisualizacoes });
            }
            setCarregando(0);
        }
        fetchEvento();
    }, [id]);

    useEffect(() => {
        const fetchImg = async () => {
            if (evento && evento.foto) {
                try {
                    const imgRef = ref(storage, `imagens/${evento.foto}`);
                    const url = await getDownloadURL(imgRef);
                    setUrlImg(url);
                } catch (error) {
                    console.error("Erro ao carregar a imagem:", error);
                }
            }
        };
        fetchImg();
    }, [evento, storage]);

    return (
        <>
            <Navbar />
            {excluido ? <Navigate to='/' /> : null}
            <div className="container-fluid">
                {carregando ? (
                    <div className="row">
                        <div className="spinner-border text-danger mx-auto mt-5" role='status'>
                            <span className="sr-only"></span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="row">
                            <img src={urlImg} className="img-banner" alt="banner" />
                            <div className="col-12 text-end mt-2 visualizacoes">
                                <i className="fa fa-eye"><span> {evento.visualizacoes + 1}</span></i>
                            </div>
                            <h3 className="text-center mt-5 titulo"> <span>{evento.titulo}</span></h3>
                        </div>
                        <div className="row mt-5 cards text-center cards">
                            <div className="col-12 col-md-3 mb-4">
                                <div className="box-info p-3">
                                    <i className="fas fa-ticket-alt fa-2x"></i>
                                    <h5><strong>Tipo</strong></h5>
                                    <span className="mt-3">{evento.tipo}</span>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-4">
                                <div className="box-info p-3">
                                    <i className="fas fa-calendar-alt fa-2x"></i>
                                    <h5><strong>Data</strong></h5>
                                    <span className="mt-3">{evento.data}</span>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-4">
                                <div className="box-info p-3">
                                    <i className="fas fa-clock fa-2x"></i>
                                    <h5><strong>Hora</strong></h5>
                                    <span className="mt-3">{evento.hora}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row box-detalhes mt-5">
                            <h5 className="text-center"><strong>Detalhes do Evento</strong></h5>
                            <p className="text-center p-3">{evento.detalhes}</p>
                        </div>
                        {usuarioLogado === evento.usuario && (
                            <>
                                <Link to={'/editarevento/' + id} className="btn-editar">
                                    <i className="fas fa-pen-square fa-3x"></i>
                                </Link>
                                <button
                                    type="button"
                                    onClick={remover}
                                    className="btn btn-lg btn-block mt-3 mb-5 btn-delete">
                                    Remover Evento
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default EventoDetalhes;
