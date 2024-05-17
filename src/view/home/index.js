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

    const [pesquisaUsuario, setPesquisaUsuario] = useState(1);

    const db = getFirestore(firebase);
    const collectionRef = collection(db, 'eventos');

    const { parametro } = useParams();
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    const pesquisaEvento = async () => {
        let usuario;
        if (parametro) {
            usuario = query(collectionRef, where('usuario', '==', usuarioEmail), where('titulo', '>=', pesquisa), where('titulo', '<=', pesquisa + '\uf8ff'))
            const querySnapshot = await getDocs(usuario);
            const items = [];

            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });

            setEventos(items);

        } else {
            const q = query(collectionRef, where('titulo', '>=', pesquisa), where('titulo', '<=', pesquisa + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            const items = [];

            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });

            setEventos(items);
        }

    };


    useEffect(() => {

        const listaEventosLogado = async () => {
            let q;
            if (parametro) {
                q = query(collectionRef, where('usuario', '==', usuarioEmail));
                const querySnapshot = await getDocs(q);
                const items = [];

                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setEventos(items);
                setPesquisaUsuario(0)
            } else {
                q = collectionRef;
            }
            
            try {
                const querySnapshot = await getDocs(q);
                const items = [];

                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setEventos(items);
            } catch (error) {
                console.log(error, 'Erro ao buscar Eventos')
            }
        };

        listaEventosLogado();

    }, [parametro, usuarioEmail]);



    return (
        <>
            <Navbar />

            <div className="row p-3">

                {
                    pesquisaUsuario ?
                    <h2 className="text-center p-5">Eventos Publicados</h2>
                    :
                    <h2 className="text-center p-5">Meus Eventos Publicados</h2>

                }

                {
                    pesquisaUsuario ?
                        <div className="pesquisa">
                            <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center box" placeholder="Pesquisar evento pelo título..." />
                        </div>
                        : ''
                }

                {
                    pesquisaUsuario ?
                        <div className="mt-3 text-center">
                            <button onClick={pesquisaEvento} type="button" className="btn btn-primary ">Pesquisar</button>
                        </div>
                        : ''
                }

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
