// Links de interés:
// https://reactrouter.com/en/main/hooks/use-params

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import herramientasData from '../data.json'
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
    // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.
    const { id } = useParams();

    const [herramientas, setHerramientas] = useState([]);

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await fetch (herramientasData);
                const data = await response.json();
                setHerramientas(data);
            }
            catch (error){
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const herramientaFilter = herramientasData.filter((herramienta) => herramienta.id == id);
    // Descomentar en caso de ser necesario realizar un debbuging.
    //console.log(herramientaFilter);

    return (
        <ItemDetail herramienta={herramientaFilter}></ItemDetail>
    )
}

export default ItemDetailContainer