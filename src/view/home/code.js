import React, { useState, useEffect } from "react";
import './home.css';

import Navbar from '../../components/navbar'

import { useSelector } from 'react-redux';
import EventoCard from "../../components/evento-card";

import firebase from '../../config/firebase';

function Home() {

    const [eventos, setEventos] = useState([]);
    let listaeventos = []

    useEffect(() => {
        firebase.firestore().collection('eventos').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaeventos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setEventos(listaeventos);
        })
    })

    return (
        <>
            <Navbar />
            <h1>{useSelector(state => state.usuarioEmail)}</h1>
            <h1>Logado: {useSelector(state => state.usuarioLogado)}</h1>

            <div className="row">
                {
                    eventos.map( item => <EventoCard />)
                }
            </div>
        </>
    )
}

export default Home;