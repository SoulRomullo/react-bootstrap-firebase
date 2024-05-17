import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';

import './evento-card.css';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


function EventoCard({ id, img, titulo, detalhes, visualizacoes }) {

    const [ urlImagem, setUrlImagem ] = useState();
    
    useEffect(() => {

        const linkImg = async () => {
            const db = getStorage(firebase)
            const imgRef = ref(db, `imagens/${img}`)
            const url =  await getDownloadURL(imgRef);
            setUrlImagem(url)
        };
        
        linkImg()

    }, [img]);
    
    return (
        <div className='col-md-3 col-sm-12 mb-3'>
            <img src={urlImagem} className='card-img-top img-cartao' alt='Imagem do Evento' />
            
            <div className='card-body'>
                <h5>{titulo}</h5>
                <p className='card-text text-justify'>
                    {detalhes}
                </p>

                <div className='row rodape-card d-flex align-items-center'>

                    <div className='col-6'>
                        <Link to={'/eventodetalhes/' + id} className='btn btn-sm btn-detalhes'>+ Detalhes</Link>
                    </div>

                    <div className='col-6 text-right'>
                        <i className='fas fa-eye'></i><span> {visualizacoes} </span>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default EventoCard;