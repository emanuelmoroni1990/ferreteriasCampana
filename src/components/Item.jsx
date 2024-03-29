// Sección de item. REV. 21/03/2023 OK.
// Emanuel Moroni

import '../styles/style.css'
import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/ShoppingCartContext'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react'
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const Item = ({idNumber, id, nombre, categoria, subcategoria, imagen, stock}) => {
    
    const {usuarioConectado, adminConectado} = useContext(CartContext);
    const [documentoUnicoRef, setDocumentoUnicoRef] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const db = getFirestore();
        // El id que paso como parámetro es único y es generado automaticamnete cada vez que se crea un nuevo documento.
        setDocumentoUnicoRef(doc(db, "herramientasStock", id));
    },[]);

    const handlerDeleteHerramientaFirestore = () => {
        deleteDoc(documentoUnicoRef).then(() => {
            console.log("elemento eliminado");
            navigate(0);    
        }
        ).catch((error) => console.log(error));    
    }

    return (
        <div key={idNumber} className='item-personal'>
            <Card maxW='sm'>
                <CardBody>
                    <Image src={imagen} alt='Foto de herramienta generica.' borderRadius='lg' className='imagen-card-personal'/>
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
                            {/* <Button variant="outline" colorScheme="green" mr="3%">
                                Editar
                            </Button> */}
                            <Button colorScheme="red" onClick={handlerDeleteHerramientaFirestore}>Eliminar</Button>
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