// Links de interés:
// https://reactrouter.com/en/main/hooks/use-location

import '../styles/style.css'
import React from 'react'
import { Card, Button, CardBody, CardFooter, Heading, Text, Image, Stack, Box, Input, useNumberInput, Flex, Spacer } from '@chakra-ui/react'

const ItemDetail = ({ herramienta }) => {

    // Descomentar para debbuging.
    // console.log(herramienta);

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

    return (
        <div>
            <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden'  variant='outline' className='item-personal item-personal__margin'>
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '300px' }}
                    // src={'../' + herramienta[0].imagen}
                    src={"../src/img/tools_1.jpg"}
                    borderRadius='lg'
                />
                <Stack>
                    <CardBody>
                    <Heading size='md'>{herramienta[0].nombre}</Heading>

                    <Text py='2'>
                        {herramienta[0].descripcion}
                    </Text>
                    </CardBody>

                    <Flex>
                        <Spacer></Spacer>
                        <Box className='box-personal'>
                            <Button {...inc} className='button-personal'>+</Button>
                            <Input {...input} />
                            <Button {...dec} className='button-personal'>-</Button>
                        </Box>
                        <Spacer></Spacer>
                    </Flex>

                    <CardFooter className='cardfooter-personal'>
                        <Button variant='solid' colorScheme='blue' className='button-personal'>
                            Comprar
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </div>
    )
}

export default ItemDetail;