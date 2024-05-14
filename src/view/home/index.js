import React, { useState, useEffect } from "react";
import './home.css';

import EventoCard from "../../components/evento-card";

import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';

import firebase from '../../config/firebase';
import { getFirestore, getDocs, collection } from "firebase/firestore";

function Home() {

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');

    const db = getFirestore(firebase)
    const collectionRef = collection(db, 'eventos');

    useEffect(() => {
        const listaEventos = async () => {
            const querySnapshot = await getDocs(collectionRef);
            const items = [];

            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            })
            setEventos(items);
        }
        listaEventos();
    }, []);

    const Pesquisa = async () => {
        const querySnapshot = await getDocs(collectionRef);
        const items = [];

        querySnapshot.forEach((doc) => {
            if (doc.data().titulo.includes(pesquisa)) {
                items.push({ id: doc.id, ...doc.data() });
            }
        });

        setEventos(items);
    };

    return (
        <>
            <Navbar />

            <div className="row p-5">
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
