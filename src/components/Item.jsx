// Links de interes:
// https://chakra-ui.com/docs/components/card/usage
// https://github.com/facebook/react/issues/23347

import '../styles/style.css'
import React, { useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Item = ({idNumber, nombre, categoria, subcategoria, imagen, stock}) => {
    
    const {usuarioConectado, adminConectado} = useContext(CartContext);

    // Decomentar en caso de que sea necesario el debugging.
    // console.log(id);
    // console.log(nombre);
    // console.log(descripcion);
    // console.log(stock);
    return (
        <div key={idNumber} className='item-personal'>
            <Card maxW='sm'>
                <CardBody>
                    <Image src={imagen} alt='Foto de herramienta generica.' borderRadius='lg'/>
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{nombre}</Heading>
                        <Text>Categoría: {categoria}</Text>
                        <Text>Subcategoría: {subcategoria}</Text>
                        <Text>Stock: {stock}</Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter className='cardfooter-personal'>
                    {
                        adminConectado ?
                        <Stack direction={{ base: 'column', md: 'row' }} >
                            <Button variant="outline" colorScheme="green" mr="3%">
                                Editar
                            </Button>
                            <Button colorScheme="red">Eliminar</Button>
                        </Stack> : 
                        usuarioConectado ?
                        <Button variant='solid' className='button-personal'>
                            {/* Para que aquí pueda emplear el id como un parámetro, debo emplear las comillas inclinadas hacia la izquierda */}
                            <Link to={`/item/${idNumber}`}>Detalles</Link>
                        </Button> :
                        <Button variant='solid' className='button-personal'>
                            {/* Para que aquí pueda emplear el id como un parámetro, debo emplear las comillas inclinadas hacia la izquierda */}
                            <Link to={`/item/${idNumber}`}>Detalles</Link>
                        </Button>
                    }                                                
                </CardFooter>
            </Card>
        </div>
    )
}

export default Item;