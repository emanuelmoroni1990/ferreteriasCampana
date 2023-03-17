// Links de interés:
// https://reactrouter.com/en/main/hooks/use-location
// https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate

import '../styles/style.css'
import React, { useState, useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import { Card, Button, CardBody, CardFooter, Heading, Text, Image, Stack, Box, Input, useNumberInput, Flex, Spacer, useToast} from '@chakra-ui/react'

const ItemDetail = ({ herramienta }) => {
    
    // Descomentar para debbuging.
    // console.log(herramienta);
    const toast = useToast();

    const {cart, setCart, usuarioConectado, setUsuarioConectado} = useContext(CartContext);
    const [cantidadCompra, setCantidadCompra] = useState(1);

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: herramienta[0].stock, // Esta propiedad dependerá de la cantidad de stock disponible.
      precision: 0,
    })

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    const handlerCantidadCompra = (e) => {
        if(e.target.id == "boton-incremento"){
            setCantidadCompra(cantidadCompra + 1);
        }
        else if(e.target.id == "boton-decremento"){
            setCantidadCompra(cantidadCompra - 1);
        }
    }

    const handlerSeleccionCompra = () => {
        console.log(cantidadCompra);
        if(usuarioConectado){
            // Primero armo un nuevo objeto de datos para presentar en la tarjeta de compra
            const auxObjeto = {
                nombre: herramienta[0].nombre,
                marca: herramienta[0].marca,
                descripcion: herramienta[0].descripcion,
                cantidad: cantidadCompra,
                precio: herramienta[0].precio,
            };

            // Luego actualizo la información en el contexto de trabajo
            // A JavaScript spread operator is a suitable option for easily providing you with the combining arrays. These are used to add the item to the array in React state.
            setCart([...cart, auxObjeto]);

            // Muestro un pequeño toast indicando que la tarea fue exitosa
            toast({
            title: 'Selección exitosa.',
            description: "La información del producto que quiere comprar se actualizo.",
            status: 'info',
            duration: 3000,
            isClosable: true,
            })
        }
        else{
            // Muestro un pequeño toast indicando que la tarea fue exitosa
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