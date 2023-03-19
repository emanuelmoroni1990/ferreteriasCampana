// Links de interes:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise#return_value

// import herramientasData from '../data.json'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Spinner } from '@chakra-ui/react'
import ItemList from './ItemList';

const ItemListContainer = () => {
    // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.
    const { marca } = useParams();

    const [herramientasData, setHerramientasData] = useState([]);

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
        //console.log(herramientasItem);
        setHerramientasData(herramientasItem);      
        // console.log(herramientasData);
      })
      .catch((error) => console.log(error));
    }, []);
    
    // console.log(herramientasData);

    // Agrego el método de pasado a LowerCase en la marca para evitar problemas en la redirección en el path indicado.
    return (
      <div>
        { 
          (herramientasData.length == 0) ?
            <div className='personal-spinner'>
              <Spinner
                  thickness='4px'
                  speed='1.5s'
                  emptyColor='gray.200'
                  size='xl'
              />
            </div> :
          marca ? 
          <ItemList herramientas={herramientasData.filter((herramienta) => herramienta.marca.toLowerCase() == marca)}></ItemList> : 
          <ItemList herramientas={herramientasData}></ItemList>         
        }
      </div>
    )
}

export default ItemListContainer;