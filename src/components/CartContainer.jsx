import '../styles/style.css'
import React, { useState, useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import Cart from './Cart'
import { Text, Divider, Stack, Button } from '@chakra-ui/react'

const CartContainer = () => {

    const {cart, setCart} = useContext(CartContext);
    const [valorTotal, setValorTotal] = useState(0);
    // console.log("Elementos carrito: ");
    // console.log(cart);
    
    const elementosCarrito = cart.map
    (compra => 
        <Cart
            key={cart.indexOf(compra)}
            nombre={compra.nombre}
            marca={compra.marca}
            descripcion={compra.descripcion}
            cantidad={compra.cantidad}
            precioUnitario={compra.precio}
            precioSubtotal={compra.precio * compra.cantidad}
        >
        </Cart>
    );

    return (
        <div>
            <Text fontSize='2xl' mt="2%" className='box-personal'>Carrito de compras</Text>
            {elementosCarrito}
            <Divider mt="5%"/>
            <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent="flex-end"
                    className="stack-personal">
                    <Text fontWeight="semibold">Precio total: ${valorTotal}</Text>
                </Stack>
                <Divider/>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent="flex-end"
                    className="stack-personal">
                    <Button className='button-personal'>
                        Confirmar compra
                    </Button>
                </Stack>
            </Stack>
        </div>
    )
}

export default CartContainer