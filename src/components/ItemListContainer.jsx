// Links de interes:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise#return_value

import herramientasData from '../data.json'
import React from 'react';
import { useParams } from 'react-router-dom'
import ItemList from './ItemList';

const ItemListContainer = () => {
  // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.
  const { marca } = useParams();

  const getData = () =>{
    return new Promise ((resolve, reject) => {
      if(herramientasData.length === null){
        reject(new Error("Empty Data..."));
      }
      resolve(herramientasData);
    });
  }

  async function fetchingData() {
    try {
      const datos = await getData();
    } catch (error) {
      console.log(error);
    }    
  }
  
  fetchingData();
  // console.log("Herramientas: " + herramientas);

  const herramientaFilter = herramientasData.filter((herramienta) => herramienta.marca == marca);

  return (
    <div>
      {marca ? <ItemList herramientas={herramientaFilter}></ItemList> : <ItemList herramientas={herramientasData}></ItemList>}
    </div>
  )
}

export default ItemListContainer;