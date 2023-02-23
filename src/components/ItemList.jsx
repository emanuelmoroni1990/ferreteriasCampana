// Links de interes:
// https://chakra-ui.com/docs/components/container/usage

import React from 'react'
import Item from './Item'
import { Container } from '@chakra-ui/react'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'

const ItemList = ({herramientas}) => {

    //console.log("ItemList herramientas: " + herramientas);

    return (
        <div>
            <Container maxW='550px' bg='purple.600' color='white'>
                {
                    herramientas.map ((herramienta) => {
                        console.log(herramienta.id);
                        console.log(herramienta.nombre);
                        console.log(herramienta.descripcion);
                        console.log(herramienta.stock);

                        <Item id={herramienta.id} nombre={herramienta.nombre} descripcion={herramienta.descripcion} stock={herramienta.stock}/>
                    })
                }
            </Container>      
        </div>
    )
}

export default ItemList;