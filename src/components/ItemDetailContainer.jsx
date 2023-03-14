// Links de interés:
// https://reactrouter.com/en/main/hooks/use-params
// https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately

// import herramientasData from '../data.json'
import '../styles/style.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Spinner } from '@chakra-ui/react'
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
    // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.
    const { id } = useParams();

    const [herramientaData, setHerramientaData] = useState([]);

    // Nueva funcionalidad implentada con el uso de Firestore
    useEffect(() => {
        // Descomentar para debugging.
        const db = getFirestore();
        // console.log(db);
        const coleccion = collection(db, "herramientasStock");
        // console.log(coleccion);
        getDocs(coleccion).then((snapshot) => {
            const herramientasItem = snapshot.docs.map(doc => doc.data());
            //console.log(herramientasItem);
            setHerramientaData(herramientasItem);
            //console.log(herramientaData);
        })
        .catch((error) => console.log(error));
    }, []);

    // console.log(herramientaData); 

    // Also, the main issue here is not just the asynchronous nature but the fact that state values are used by functions based on their current closures, and state updates will reflect in the next re-render by which the existing closures are not affected, but new ones are created. 
    return (
        <div>
            {
                (herramientaData.length > 0) ?
                <ItemDetail herramienta={herramientaData.filter((herramienta) => herramientaData.indexOf(herramienta) == id)}></ItemDetail> :
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