// Sección de SignUp. REV 21/03/2023 OK
// Emanuel Moroni

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, Avatar, Center, useToast } from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {

    const navigate = useNavigate();
    const toast = useToast();
    
    //#region EstadosCampos

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [correoUsuario, setCorreoUsuario] = useState("");
    const [contraseniaUsuario, setContraseñaUsuario] = useState("");

    //#endregion

    const handlerInformacionUsuario = (e) => {
        let nombreId;

        nombreId = e.target.id
        switch(nombreId){
            case "nombre-usuario":
                setNombreUsuario(e.target.value);
                break;
            
            case "correo-usuario":
                setCorreoUsuario(e.target.value);
                break;

            case "password-usuario":
                setContraseñaUsuario(e.target.value);
                break;
        }
    }

    const handlerAltaUsuario = () => {
        if((nombreUsuario != "") && (correoUsuario != "") && (contraseniaUsuario != "")){
            // console.log("Usuario " + nombreUsuario + " Correo: " + correoUsuario + " Contraseña: " + contraseniaUsuario);            
            const auth = getAuth();

            createUserWithEmailAndPassword(auth, correoUsuario, contraseniaUsuario)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user);

                toast({
                    title: 'Usuario dado de alta',
                    description: "Su usuario fue creado correctamente.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                navigate("/ListadoProductos");
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // console.log(error.message)
                toast({
                    title: 'Advertencia',
                    description: error.message,
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
            });
        }
        else{
            toast({
                title: 'Verificar los campos solicitados',
                description: "Todos los campos deben ser completados de la manera correcta.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <Flex
        //   minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Proceso de alta de usuario
            </Heading>
            <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                <Avatar size="xl" src={'../src/img/icons/profile.png'}>
                    {/* <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                    /> */}
                </Avatar>
                </Center>
                <Center w="full">
                <Button w="full" isDisabled={true}>Cambiar avatar personal</Button>
                </Center>
            </Stack>
            </FormControl>
            <FormControl id="userName" isRequired>
            <FormLabel>Nombre de usuario</FormLabel>
            <Input
                id="nombre-usuario"
                placeholder="Nombre de usuario"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                onInput={handlerInformacionUsuario}
            />
            </FormControl>
            <FormControl id="email" isRequired>
            <FormLabel>Dirección de correo</FormLabel>
            <Input
                id='correo-usuario'
                placeholder="tucorreo@mail.com"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                onInput={handlerInformacionUsuario}
            />
            </FormControl>
            <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
                id='password-usuario'
                placeholder="Contraseña"
                _placeholder={{ color: 'gray.500' }}
                type="password"
                onInput={handlerInformacionUsuario}
            />
            </FormControl>
            <Stack spacing={6} direction={['column', 'row']}>
            {/* <Button bg={'red.400'} color={'white'} w="full" _hover={{bg: 'red.500'}}>
                Cancelar
            </Button> */}
            <Button
                bg={'blue.400'}
                color={'white'}
                w="full"
                _hover={{
                bg: 'blue.500',
                }}
                onClick={handlerAltaUsuario}>
                Dar de alta
            </Button>
            </Stack>
        </Stack>
        </Flex>
    )
}

export default SignUp