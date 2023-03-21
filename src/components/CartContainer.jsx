// Sección del carrito de compras. REV. 21/03/2023 OK 
// Emanuel Moroni

import '../styles/style.css'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/ShoppingCartContext'
import Cart from './Cart'
import { Text, Divider, Stack, Button, useToast } from '@chakra-ui/react'
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const CartContainer = () => {

    const {cart, setCart} = useContext(CartContext);
    const [coleccionDocs, setColeccionesDocs] = useState();
    const [userInformacion, setUserInformacion] = useState();
    const navigate = useNavigate();
    const toast = useToast();    
    
    useEffect(() => {
        if(cart.length > 0){
            var cartAux = [];
            // Hago esto para no hacer una shallow copy sino una deep copy. ¿Por qué hago esto? Porque si luego cambio cartAux, cambiará también cart. Y esto provocará un renderización en un loop infinito.
            cartAux = JSON.parse(JSON.stringify(cart));
            // console.log(cartAux);
            // console.log(cartAux[cartAux.length - 1].id);

            // var cartOrdenado = [];
            // var elementosBorrar = [];

            const objetoAux = { cantidad: "", descripcion: "", id: "", marca: "", nombre: "", precio: "" };
            // console.log(objetoAux);
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
            // console.log(cartAux);
        }            
    },[]);

    useEffect(() => {
        const db = getFirestore();
        // console.log(db);        
        const auth = getAuth();
        const user = auth.currentUser;
        setColeccionesDocs(collection(db, "pedidosClientes"));
        setUserInformacion(user);
        //console.log(coleccionDocs);      
    },[]);

    const handlerConfirmacionCompra = () => {

        let idPedidoCompra;        
        let objetoPedidoCompra = {usuario: userInformacion.email};

        for(let i = 0; i < cart.length; i++){
            let itemName = "item" + i;
            let objectAux = {};
            
            let arrayPedidoCompra = [];

            arrayPedidoCompra.push(cart[i].nombre);
            arrayPedidoCompra.push(cart[i].marca);
            arrayPedidoCompra.push(cart[i].descripcion);
            arrayPedidoCompra.push(cart[i].cantidad);
            arrayPedidoCompra.push(cart[i].precio * cart[i].cantidad);

            objectAux[itemName] = arrayPedidoCompra;

            Object.assign(objetoPedidoCompra, objectAux)
        }    

        addDoc(coleccionDocs, objetoPedidoCompra).then( (docRef) => {
            idPedidoCompra = docRef.id;
            toast({
                title: 'Pedido de compra realizado.',
                description: "Su número de seguimiento es " + docRef.id,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            setCart([]);
            navigate("/ListadoProductos");
        }).catch((error) => {console.log(error)})
        
    }
    
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
            {   cart.length > 0 ?
                elementosCarrito :
                <Text fontSize='xl' mt="2%" className='box-personal'>Aún no has comprado nada</Text>
            }
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
                    <Button className='button-personal' isDisabled={cart.length == 0} onClick={handlerConfirmacionCompra}>
                        Confirmar compra
                    </Button>
                </Stack>
            </Stack>
        </div>
    )
}

export default CartContainer