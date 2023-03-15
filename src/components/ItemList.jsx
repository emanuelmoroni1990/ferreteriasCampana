// Links de interes:
// https://chakra-ui.com/docs/components/container/usage
// https://beta.reactjs.org/learn/rendering-lists; Empleando lo mencionado en este link es como pude resolver el problema de no poder renderizar correctamente los items.

import '../styles/style.css'
import React from 'react'
import Item from './Item'

const ItemList = ({herramientas}) => {
    // console.log(herramientas);

    // El problema original que tenía eran las llaves colocadas en rededor del Item. ¿Es algo que cambió con la nueva versión beta?
    // Docs. Arrow functions implicitly return the expression right after =>, so you didn’t need a return statement:
    // However, you must write return explicitly if your => is followed by a { curly brace!
    // Arrow functions containing => { are said to have a “block body”. They let you write more than a single line of code, but you have to write a return statement yourself. If you forget it, nothing gets returned!

    const listItems = herramientas.map
    (herramienta =>
        <Item 
            key={herramientas.indexOf(herramienta)} // Aqui lo resuelvo dandole un key igual al número de cada elemento que mapeo.
            id={herramientas.indexOf(herramienta)} 
            nombre={herramienta.nombre} 
            categoria={herramienta.categoria}
            subcategoria={herramienta.subcategoria}
            imagen={herramienta.imagen} 
            // imagen={"../src/img/tools_1.jpg"}
            stock={herramienta.stock}>
        </Item>
    );

    return (
        // Doy al contenedor de todas las tarjeta de productos los estilos de un display flex para que se apilen según el ancho de la pantalla.
        <div className='card-personal'>
            {listItems}
        </div>
    )
}

export default ItemList;