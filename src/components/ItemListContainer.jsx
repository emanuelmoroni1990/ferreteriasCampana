// Links de interes:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise#return_value

import herramientas from '../data.json'
import React from 'react';
import ItemList from './ItemList';

const ItemListContainer = () => {

  const getData = () =>{
    return new Promise ((resolve, reject) => {
      if(herramientas.length === null){
        reject(new Error("Empty Data..."));
      }
      resolve(herramientas);
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

  return (
    <div>
      <ItemList herramientas={herramientas}></ItemList>
    </div>
  )
}

export default ItemListContainer;