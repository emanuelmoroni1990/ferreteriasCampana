// Sección de listado de items. REV 21/03/2023. OK
// Emanuel Moroni

import '../styles/style.css'
import React from 'react'
import Item from './Item'

const ItemList = ({herramientas}) => {
    // console.log(herramientas);

    //#region ComentarioImportante
    // El problema original que tenía eran las llaves colocadas en rededor del Item. ¿Es algo que cambió con la nueva versión beta?
    // Docs. Arrow functions implicitly return the expression right after =>, so you didn’t need a return statement:
    // However, you must write return explicitly if your => is followed by a { curly brace!
    // Arrow functions containing => { are said to have a “block body”. They let you write more than a single line of code, but you have to write a return statement yourself. If you forget it, nothing gets returned!
    //#endregion

    const listItems = herramientas.map
    (herramienta =>
        <Item 
            key={herramientas.indexOf(herramienta)} // Aqui lo resuelvo dandole un key igual al número de cada elemento que mapeo.
            idNumber={herramientas.indexOf(herramienta)} 
            id={herramienta.id}
            nombre={herramienta.nombre} 
            categoria={herramienta.categoria}
            subcategoria={herramienta.subcategoria}
            imagen={herramienta.imagen} // Ahora la imagen es una URL de descarga desde FirebaseStorage
            // imagen={"../src/img/tools_1.jpg"} // Descomentar para emplear una imagen que este localmente.
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