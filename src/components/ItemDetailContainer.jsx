// Sección de detalle de los items. REV 21/03/2023. OK.
// Emanuel Moroni

import '../styles/style.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
    // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.
    const { idNumber } = useParams();

    const [herramientaData, setHerramientaData] = useState([]);

    // Nueva funcionalidad implentada con el uso de Firestore
    useEffect(() => {
        // Descomentar para debugging.
        const db = getFirestore();
        // console.log(db);
        const coleccion = collection(db, "herramientasStock");
        // console.log(coleccion);
        getDocs(coleccion).then((snapshot) => {
            // snapshot.docs.forEach(docs => console.log(docs.id)); // Con esta línea obtengo los IDs de cada uno de los elementos de la coleccion.
            const herramientasItem = snapshot.docs.map(
                (doc) => ({
                    "id": doc.id, // Este id va a ser el generado por Firestore al momento de crear cada nuevo documento
                    "categoria": doc.data().categoria,
                    "descripcion": doc.data().descripcion,
                    "imagen": doc.data().imagen,
                    "marca": doc.data().marca,
                    "nombre": doc.data().nombre,
                    "precio": doc.data().precio,
                    "stock": doc.data().stock,
                    "subcategoria": doc.data().subcategoria
                })                    
                );
            // console.log(herramientasItem);
            setHerramientaData(herramientasItem);
        })
        .catch((error) => console.log(error));
    }, []);

    //#region ComentarioImportante
    // Also, the main issue here is not just the asynchronous nature but the fact that state values are used by functions based on their current closures, and state updates will reflect in the next re-render by which the existing closures are not affected, but new ones are created. 
    //#endregion

    return (
        <div>
            {
                (herramientaData.length > 0) ?
                <ItemDetail herramienta={herramientaData.filter((herramienta) => herramientaData.indexOf(herramienta) == idNumber)}></ItemDetail> :
                // Este spinner de carga lo tengo que poner porque al momento de levantar el estado de herramientaData siempre es vacío. Esto me rompe el ItemDetail.
                // Una vez actualizado el estado, paso el parámetro con toda la información necesaria.
                <div className='personal-spinner'>
                    <Spinner
                        thickness='4px'
                        speed='1.5s'
                        emptyColor='gray.200'
                        size='xl'
                    />
                </div>                
            }
        </div>
        // 
    )
}

export default ItemDetailContainer