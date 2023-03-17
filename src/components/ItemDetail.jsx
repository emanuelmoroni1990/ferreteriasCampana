// Links de interés:
// https://reactrouter.com/en/main/hooks/use-location
// https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate

import '../styles/style.css'
import React, { useState, useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import { useNavigate } from 'react-router-dom'
import { Card, Button, CardBody, CardFooter, Heading, Text, Image, Stack, Box, Input, useNumberInput, Flex, Spacer, useToast} from '@chakra-ui/react'
import { getFirestore, doc, updateDoc  } from "firebase/firestore";

const ItemDetail = ({ herramienta }) => {
    
    // Descomentar para debbuging.
    // console.log(herramienta);
    const toast = useToast();    
    const navigate = useNavigate();

    const {cart, setCart, usuarioConectado, setUsuarioConectado} = useContext(CartContext);
    const [cantidadCompra, setCantidadCompra] = useState(0);

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: herramienta[0].stock, // Esta propiedad dependerá de la cantidad de stock disponible.
      precision: 0,
    })

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    const handlerCantidadCompra = (e) => {
        if((e.target.id == "boton-incremento") && (cantidadCompra < herramienta[0].stock)){
            setCantidadCompra(cantidadCompra + 1);
        }
        else if((e.target.id == "boton-incremento") && (cantidadCompra == herramienta[0].stock)){
            // Muestro un pequeño toast indicando información respecto al stock
            toast({
                title: 'Máximo stock.',
                description: "No puede seleccionar una cantidad mayor al stock.",
                status: 'info',
                duration: 3000,
                isClosable: true,
            })
        }
        else if((e.target.id == "boton-decremento") && (cantidadCompra > 0)){
            setCantidadCompra(cantidadCompra - 1);
        }
    }

    const handlerSeleccionCompra = () => {
        //console.log(cantidadCompra);
        if(usuarioConectado && (herramienta[0].stock > 0)){
            // Primero armo un nuevo objeto de datos para presentar en la tarjeta de compra
            const auxObjeto = {
                id: herramienta[0].id,
                nombre: herramienta[0].nombre,
                marca: herramienta[0].marca,
                descripcion: herramienta[0].descripcion,
                cantidad: cantidadCompra,
                precio: herramienta[0].precio,
            };

            // Además, tengo que actualizar el stock en la base de datos, a partir de lo solicitado por el usuario
            // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#update-data
            const db = getFirestore();
            const documentoUnicoRef = doc(db, "herramientasStock", herramienta[0].id);
            updateDoc(documentoUnicoRef, {stock: (herramienta[0].stock - cantidadCompra)}).then(
                console.log("Actualizacion de stock en base de datos...")
            ).catch((error) => console.log(error))

            // Luego actualizo la información en el contexto de trabajo
            // A JavaScript spread operator is a suitable option for easily providing you with the combining arrays. These are used to add the item to the array in React state.
            setCart([...cart, auxObjeto]);

            // En el primero de los casos que se agregue un elemento al carrito, no se podrá repetir nunca un objeto seleccionado. Ahora, ya luego de la segunda selección
            // se puede dar que los elementos se repitan.
            // Repasaré entonces que no haya ya seleccionado el mismo artículo. De ser así, incremento el número de artículos a comprar en el original.
            // const elementoRepetido = cart.filter((elementoCarrito) => (elementoCarrito.marca == auxObjeto.marca));
            // console.log("Cart: ")
            // console.log(cart)
            // console.log("Elemento repetido: ")
            // console.log(elementoRepetido);

            // Muestro un pequeño toast indicando que la tarea fue exitosa
            toast({
                title: 'Selección exitosa.',
                description: "La información del producto que quiere comprar se actualizo.",
                status: 'info',
                duration: 3000,
                isClosable: true,
            })

            navigate("/Cart");
        }
        else if ((herramienta[0].stock == 0)){
            toast({
                title: 'No hay stock.',
                description: "No hay más artículos disponibles de este producto.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Ingrese al sistema.',
                description: "Para poder realizar compras debe loguearse en el sistema.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }        
    }

    return (
        <div>
            <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden'  variant='outline' className='item-personal item-personal__margin'>
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '300px' }}
                    src={herramienta[0].imagen}
                    //src={"../src/img/tools_1.jpg"}
                    borderRadius='lg'
                />
                <Stack>
                    <CardBody>
                    <Heading size='md'>{herramienta[0].nombre}</Heading>

                    <Text py='2'>
                        {herramienta[0].descripcion}
                    </Text>
                    <Text py='2'>
                        Precio unitario: ${herramienta[0].precio}
                    </Text>
                    </CardBody>

                    <Flex>
                        <Spacer></Spacer>
                        <Box className='box-personal'>
                            <Button id="boton-incremento" className='button-personal' onClick={handlerCantidadCompra} {...inc}>+</Button>
                                <Input {...input}/>
                            <Button id="boton-decremento" className='button-personal' onClick={handlerCantidadCompra} {...dec}>-</Button>
                        </Box>
                        <Spacer></Spacer>
                    </Flex>

                    <CardFooter className='cardfooter-personal'>
                        <Button variant='solid' colorScheme='blue' className='button-personal' onClick={handlerSeleccionCompra}>
                            Comprar
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </div>
    )
}

export default ItemDetail;