// Sección del carrito de compras. REV. 21/03/2023 OK 
// Emanuel Moroni

import '../styles/style.css'
import React, { useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import { Stack, Text, Button, Divider } from '@chakra-ui/react';
import { getFirestore, doc, updateDoc, getDoc  } from "firebase/firestore";

const Cart = ({id, nombre, marca, descripcion, cantidad, precioUnitario, precioSubtotal}) => {

  const {cart, setCart} = useContext(CartContext);

  const handlerDeleteHerramientaCarrito = (e) => {
    console.log(e.target.id);

    // Además, tengo que actualizar el stock en la base de datos, a partir de lo solicitado por el usuario
    // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#update-data
    const db = getFirestore();
    const documentoUnicoRef = doc(db, "herramientasStock", id);

    // Aquí solo voy a tener un elemento, el cual será el coincidente con el id a eliminar.
    const cartEliminar = cart.filter((elementoCarrito) => (elementoCarrito.id == e.target.id));
    const cantidadEliminar = parseInt(cartEliminar[0].cantidad);
    console.log("CantidadEliminar: " + cantidadEliminar);
    
    // Luego traigo de la base de datos el stock actual que hay.
    getDoc(documentoUnicoRef).then((snapshot) => {
      if(snapshot.exists()){
          const stockActualFirestore = snapshot.data().stock;
          console.log(stockActualFirestore);

          // Una vez que cuento con el stock, lo sumo a lo eliminado por usuario, ya que este valor se actualizará.
          updateDoc(documentoUnicoRef, {stock: cantidadEliminar + stockActualFirestore}).then(
              console.log("Actualizacion de stock en base de datos...")
          ).catch((error) => console.log(error))
      }
    }
    ).catch((error) => console.log(error));    
    
    // Este filtrado me devuelve un nuevo array con todos los elementos, menos el que tiene el id que deseo eliminar. Este array lo vuelco en el cart.
    const cartNuevo = cart.filter((elementoCarrito) => (elementoCarrito.id != e.target.id));
    setCart(cartNuevo);
  }

  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        className="stack-personal">
        <Stack direction="column" alignItems="start">
          <Text fontWeight="semibold" as='u'>{nombre}, marca {marca}</Text>
          <Text fontWeight="ligth">Precio unitario: ${precioUnitario} - Cantidad: {cantidad} {cantidad > 1 ? "unidades" : "unidad"}</Text>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Text fontWeight="ligth">Precio subtotal: ${precioSubtotal}</Text>
        </Stack>
      </Stack>
      <Divider/>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        className="stack-personal">
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>Descripcion del producto: {descripcion}</Text>
        <Stack direction={{ base: 'column', md: 'row' }} >
          {/* <Button variant="outline" colorScheme="green">
            Editar
          </Button> */}
          <Button colorScheme="red" id={id} onClick={handlerDeleteHerramientaCarrito}>Eliminar</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Cart;