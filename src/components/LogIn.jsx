// Sección de LogIn. REV. 21/03/2023 OK
// Emanuel Moroni

import React, { useState, useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import { Link, useNavigate } from 'react-router-dom'
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {

    const {cart, setCart, usuarioConectado, setUsuarioConectado, adminConectado, setAdminConectado} = useContext(CartContext);
    const navigate = useNavigate();
    const toast = useToast();    

    //#region EstadosCampos

    const [correoUsuario, setCorreoUsuario] = useState("");
    const [contraseniaUsuario, setContraseñaUsuario] = useState("");

    //#endregion

    const handlerInformacionUsuario = (e) => {
        let nombreId;

        nombreId = e.target.id
        switch(nombreId){            
            case "correo-usuario":
                setCorreoUsuario(e.target.value);
                break;

            case "password-usuario":
                setContraseñaUsuario(e.target.value);
                break;
        }
    }

    const handlerLogInUsuario = () => {
        if((correoUsuario != "") && (contraseniaUsuario != "")){
            //console.log("Correo: " + correoUsuario + " Contraseña: " + contraseniaUsuario);            
            const auth = getAuth();

            signInWithEmailAndPassword(auth, correoUsuario, contraseniaUsuario)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user.uid);                

                // Si esta condicion se da es porque quien se conecto es el usuario admin.
                // Nunca se podrá dar de alta por esta plataforma un usuario admin. Siempre lo generará el desarrollador.
                if(user.uid == "cavjPbbF0ba3AWqjlzo04CEzTfh2"){
                    setUsuarioConectado(false);
                    setAdminConectado(true);
                    localStorage.setItem("usuarioConectado", false);
                    localStorage.setItem("adminConectado", true);

                    toast({
                        title: 'Usuario ADMIN',
                        description: "Usted es el usuario administrador.",
                        status: 'info',
                        duration: 5000,
                        isClosable: true,
                    });
                } 
                else{
                    setUsuarioConectado(true);
                    setAdminConectado(false);
                    localStorage.setItem("usuarioConectado", true);
                    localStorage.setItem("adminConectado", false);

                    toast({
                        title: 'Ingreso al sistema',
                        description: "Su usuario fue logueado correctamente.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                });
                }
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
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Logueate con tu cuenta</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Ingresa al sistema para poder realizar tus compras
                </Text>
                </Stack>
                <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <FormControl id="email">
                    <FormLabel>Dirección de correo</FormLabel>
                        <Input 
                            id='correo-usuario'
                            type="email"
                            onInput={handlerInformacionUsuario}                     
                        />
                    </FormControl>
                    <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                        <Input 
                            id='password-usuario'
                            type="password"
                            onInput={handlerInformacionUsuario} 
                        />
                    </FormControl>
                    <Stack spacing={10}>
                    {/* <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox>Recuerdame</Checkbox>
                        <Link color={'blue.400'}>¿Olvidaste tu contraseña?</Link>
                    </Stack> */}
                    <Button
                        mt="5%"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}
                        onClick={handlerLogInUsuario}>
                        Ingresar
                    </Button>
                    </Stack>
                </Stack>
                </Box>
                <Stack pt={6}>
                    <Text align={'center'}>
                    ¿No tienes un usuario? <Text as='u' color={'blue.400'}><Link to={'/SignUp'}>Créalo aquí.</Link></Text>
                    </Text>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default LogIn