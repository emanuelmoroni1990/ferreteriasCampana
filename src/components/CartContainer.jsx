// Link de interés:
// https://www.freecodecamp.org/espanol/news/ordenar-arreglos-en-javascript-como-usar-el-metodo-sort/#:~:text=En%20JavaScript%2C%20podemos%20ordenar%20los,siempre%20es%20la%20soluci%C3%B3n%20adecuada.

import '../styles/style.css'
import React, { useState, useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import Cart from './Cart'
import { Text, Divider, Stack, Button } from '@chakra-ui/react'

const CartContainer = () => {

    const {cart, setCart} = useContext(CartContext);
    // console.log("Elementos carrito: ");
    // console.log(cart);

    // var arrayAux = [];
    // arrayAux = cart;
    // console.log(arrayAux);

    // var cartOrdenado = [];
    // var elementosBorrar = [];

    // var objetoAux = { "cantidad": "", "descripcion": "", "id": "", "marca": "", "nombre": "", "precio": "" };
    // console.log(objetoAux);

    // for (let i = 0; i < arrayAux.length; i++) {

    //     for (let j = 1; j < arrayAux.length; j++) {

    //         if(arrayAux[i].id == arrayAux[j + i].id){
    //             objetoAux.cantidad = arrayAux[i].cantidad + arrayAux[j].cantidad;
    //             objetoAux.descripcion = arrayAux[i].descripcion;
    //             objetoAux.id = arrayAux[i].id;
    //             objetoAux.marca = arrayAux[i].marca;
    //             objetoAux.nombre = arrayAux[i].nombre;
    //             objetoAux.precio = arrayAux[i].precio;
    //             console.log(objetoAux);

    //             cartOrdenado.push(objetoAux);
    //             console.log(cartOrdenado);

    //             elementosBorrar.push(j);
    //             console.log(elementosBorrar)
    //         }
    //     }

    //     for (let k = 0; k < elementosBorrar.length; k++) {
    //         arrayAux.splice(elementosBorrar[k],1);
    //     }        
    // }

    // console.log(cartOrdenado);

    
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

    var precioTotal = 0; 
    for(var i = 0; i < cart.length; i++)
    {
        precioTotal += (parseFloat(cart[i].precio) * parseInt(cart[i].cantidad));
    }
    // console.log(precioTotal);

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
                    <Text fontWeight="semibold">Precio total: ${precioTotal}</Text>
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