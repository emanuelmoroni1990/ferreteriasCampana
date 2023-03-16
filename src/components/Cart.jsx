import '../styles/style.css'
import React from 'react'
import { Stack, Text, Button, Divider } from '@chakra-ui/react';

const Cart = ({nombre, marca, descripcion, cantidad, precioUnitario, precioSubtotal}) => {

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
          <Button variant="outline" colorScheme="green">
            Editar
          </Button>
          <Button colorScheme="red">Eliminar</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Cart;