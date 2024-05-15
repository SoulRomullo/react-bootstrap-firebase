import React, { useState, useEffect } from "react";
import './home.css';

import EventoCard from "../../components/evento-card";
import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import firebase from '../../config/firebase';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";

function Home() {
    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');

    const db = getFirestore(firebase);
    const collectionRef = collection(db, 'eventos');

    const { parametro } = useParams();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {
        const listaEventos = async () => {
            let q;
            if (parametro) {
                q = query(collectionRef, where('usuario', '==', usuarioEmail));
            } else {
                q = collectionRef; // Consulta sem filtro
            }

            const querySnapshot = await getDocs(q);
            const items = [];

            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setEventos(items);
        };
        listaEventos();
    }, [parametro, usuarioEmail, collectionRef]);

    const Pesquisa = async () => {
        const q = query(collectionRef, where('titulo', '>=', pesquisa), where('titulo', '<=', pesquisa + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const items = [];

        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });

        setEventos(items);
    };

    return (
        <>
            <Navbar />

            <div className="row p-3">

                <h2 className="text-center p-5">Eventos Publicados</h2>

                <div className="pesquisa">
                    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center box" placeholder="Pesquisar evento pelo título..." />
                </div>

                <div className="mt-3 text-center">
                    <button onClick={Pesquisa} type="button" className="btn btn-primary ">Pesquisar</button>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row p-3">
                    {
                        eventos.map(item => <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)
                    }
                </div>
            </div>

        </>
    )
}

export default Home;
