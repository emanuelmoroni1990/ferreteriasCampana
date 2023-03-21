// Sección en desarrollo. No aplica para la entrega final de proyecto. 21/03/2023
// Emanuel Moroni.

import React from 'react'
import { Stack, Text, Button, Divider } from '@chakra-ui/react';

const Order = ({orderId}) => {
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        className="stack-personal">
        <Stack direction="column" alignItems="start">
          <Text fontWeight="semibold" as='u'>Orden de compra: {orderId}</Text>
          {/* <Text fontWeight="ligth">Precio unitario: ${precioUnitario} - Cantidad: {cantidad} {cantidad > 1 ? "unidades" : "unidad"}</Text> */}
        </Stack>
        <Stack direction="row" alignItems="center">
          {/* <Text fontWeight="ligth">Precio subtotal: ${precioSubtotal}</Text> */}
        </Stack>
      </Stack>
      <Divider/>
      {/* <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        className="stack-personal">
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>Descripcion del producto: {descripcion}</Text>
        <Stack direction={{ base: 'column', md: 'row' }} >
          
          <Button colorScheme="red" id={id} onClick={handlerDeleteHerramientaCarrito}>Eliminar</Button>
        </Stack>
      </Stack> */}

    </Stack>
  )
}

export default Order