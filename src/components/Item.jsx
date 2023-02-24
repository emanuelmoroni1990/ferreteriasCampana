// Links de interes:
// https://chakra-ui.com/docs/components/card/usage
// https://github.com/facebook/react/issues/23347

import '../styles/style.css'
import React from 'react'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'

const Item = ({id, nombre, descripcion, stock}) => {

    console.log(id);
    console.log(nombre);
    console.log(descripcion);
    console.log(stock);

    return (
        <div key={id} className='item-personal'>
                <Card maxW='sm'>
                    <CardBody>
                        <Image src='src/img/tools_1.jpg' alt='Foto de herramienta generica.' borderRadius='lg'/>
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>{nombre}</Heading>
                            <Text>
                                {descripcion}
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button variant='solid' colorScheme='blue'>
                                Buy now: {id}
                            </Button>
                            <Button variant='ghost' colorScheme='blue'>
                                {stock}
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>

        </div>
    )
}

export default Item;