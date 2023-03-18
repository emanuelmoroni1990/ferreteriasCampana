// Link de interés:
// https://www.freecodecamp.org/espanol/news/ordenar-arreglos-en-javascript-como-usar-el-metodo-sort/#:~:text=En%20JavaScript%2C%20podemos%20ordenar%20los,siempre%20es%20la%20soluci%C3%B3n%20adecuada.

import '../styles/style.css'
import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import Cart from './Cart'
import { Text, Divider, Stack, Button } from '@chakra-ui/react'

const CartContainer = () => {

    const {cart, setCart} = useContext(CartContext);
    // console.log("Elementos carrito: ");
    // console.log(cart);

    useEffect(() => {
        if(cart.length > 0){
            var cartAux = [];
            // Hago esto para no hacer una shallow copy sino una deep copy. ¿Por qué hago esto? Porque si luego cambio cartAux, cambiará también cart. Y esto provocará un renderización
            // en un loop infinito.
            cartAux = JSON.parse(JSON.stringify(cart));
            console.log(cartAux);

            console.log(cartAux[cartAux.length - 1].id);

            // var cartOrdenado = [];
            // var elementosBorrar = [];

            const objetoAux = { cantidad: "", descripcion: "", id: "", marca: "", nombre: "", precio: "" };
            console.log(objetoAux);
            var coincidencia = false;
            var indiceRepetido;

            for (let i = 0; i < cartAux.length - 1; i++) {            
                if(cartAux[cartAux.length - 1].id == cartAux[i].id){
                    console.log("coincidencia");
                    coincidencia = true;
                    indiceRepetido = i;
                    objetoAux.cantidad = cartAux[cartAux.length - 1].cantidad + cartAux[i].cantidad;
                    objetoAux.descripcion = cartAux[i].descripcion;
                    objetoAux.id = cartAux[i].id;
                    objetoAux.marca = cartAux[i].marca;
                    objetoAux.nombre = cartAux[i].nombre;
                    objetoAux.precio = cartAux[i].precio;
                    console.log(objetoAux);
                    //cartAux.push(objetoAux);

                    // cartAux.splice(i, 1);
                    // console.log(cartAux)
                    // cartAux.splice(cartAux.length - 1, 1);
                    // console.log(cartAux)
                }
            }

            if(coincidencia){
                // Primero lo que hago es el elemento que ya había comprado lo elimino.
                cartAux.splice(indiceRepetido, 1);
                console.log(cartAux)
                // Luego, elimino el último elemento del carrito que es el nuevo artículo que coincide que el que ya había en el carrito.
                cartAux.splice(cartAux.length - 1, 1);
                console.log(cartAux)
                // Por último, agrego al carrito un nuevo elemento que es exactamente igual a los otros dos pero con la cantidad igual a la suma de ambos.
                cartAux.push(objetoAux);
                console.log(cartAux);
            }

            setCart(cartAux);
            console.log(cartAux);
        }            
    },[]);
    
    const elementosCarrito = cart.map
    (compra => 
        <Cart
            key={cart.indexOf(compra)}
            id = {compra.id}
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