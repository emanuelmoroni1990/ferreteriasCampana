// Barra de navegación. REV. 21/03/2023 OK
// Emanuel Moroni

import '../styles/style.css'
import React , { useState, useEffect, useContext }from 'react';
import { CartContext } from '../context/ShoppingCartContext'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Flex, Avatar, HStack, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, collection, updateDoc, getDoc } from "firebase/firestore";

const NavBar = () => {
  // console.log(usuarioConectado);
  // console.log(adminConectado);

  const {cart, setCart, usuarioConectado, setUsuarioConectado, adminConectado, setAdminConectado} = useContext(CartContext);
  const navigate = useNavigate();
  // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios. It can be used to control feedback component such as Modal, AlertDialog, Drawer, etc.
  // The useDisclosure hook returns an object with the following fields:
  // isOpen => If true, it sets the controlled component to its visible state.
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  
  const handlerCierreSesion = () => {

    const auth = getAuth();

    signOut(auth).then(() => {
      // Cualquiera de los dos tipos de usuarios que este logueado, al momento de salir, es igual.
      setAdminConectado(false);
      setUsuarioConectado(false);
      window.localStorage.setItem("usuarioConectado", false);
      window.localStorage.setItem("adminConectado", false);

      const db = getFirestore();
      const coleccion = collection(db, "herramientasStock");
      // console.log(coleccion);
      // console.log(cart)

      // Esta parte actualiza la base de datos si el usuario se desloguea sin confirmar el pedido de compra. Repasar para futuras versiones del proyecto.
      for(let i = 0; i < cart.length; i++){
        let documentoUnicoRef = doc(db, "herramientasStock", cart[i].id);

        // Luego traigo de la base de datos el stock actual que hay.
        getDoc(documentoUnicoRef).then((snapshot) => {
          if(snapshot.exists()){
              const stockActualFirestore = snapshot.data().stock;
              //console.log(stockActualFirestore);

              // Una vez que cuento con el stock, lo sumo a lo eliminado por usuario, ya que este valor se actualizará.
              updateDoc(documentoUnicoRef, {stock: cart[i].cantidad + stockActualFirestore}).then(
                  //console.log("Actualizacion de stock en base de datos...")
              ).catch((error) => console.log(error))
          }
        }
        ).catch((error) => console.log(error));    
      }

      setCart([]);
      navigate("/");
    }).catch((error) => { console.log(error); });
  }

  return (
    <div>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} className='navbar-personal'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            // Aquí estoy empleando el campo isOpen del objeto retornado por el hook useDisclosure();
            // Si es verdadero, muestro el ícono de cierre. En caso de se contrario, muestro el ícono de las líneas tipo "hamburguesa".
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            className='iconbutton-personal'
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link to={'/'}>
              <Avatar
                  size={'md'}
                  src={
                    '../src/img/icons/tool-box.png'
                  }
                />
            </Link>
            {/* Decomentar para ingresar el nombre de la marcar. Aplicar estilos para que queden centrados juntos. */}
            {/* <Box>Logo</Box> */}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              className='pilaHorizontal-personal'>
                <Link to={'/ListadoProductos'}>Productos</Link>
                <Menu>
                  <MenuButton className='menuButton-personal'>Marcas</MenuButton>
                  <MenuList>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/stanley'}>Stanley</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/bahco'}>Bahco</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/skill'}>SKILL</Link></MenuItem>
                    {/* <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/makita'}>Makita</Link></MenuItem> */}
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/generico'}>Genéricas</Link></MenuItem>
                </MenuList>
                </Menu>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* Este boton por el momentos no tiene utilidad, de manera que lo dejo comentado. Ver su aplicacion en etapas posteriores del proyecto. */}
            {/* <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} leftIcon={<AddIcon/>}>Action</Button> */}
            { adminConectado ? 
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'md'}
                    src={
                      '../src/img/icons/profile_logueado.png'
                    }
                  />
                </MenuButton>
                <MenuList>
                  {/* <MenuItem>Editar perfil</MenuItem> */}
                  <MenuItem><Link to={'/ItemUpload'}>Ingresar artículos</Link></MenuItem>
                  <MenuItem><Link to={'/ImageUpload'}>Ingresar imágenes</Link></MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handlerCierreSesion}>Cerrar sesión</MenuItem>
                </MenuList>
              </Menu> :
              usuarioConectado ? 
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'md'}
                    src={
                      '../src/img/icons/profile_logueado.png'
                    }
                  />
                </MenuButton>
                <MenuList>
                  {/* <MenuItem>Editar perfil</MenuItem> */}
                  {/* <MenuItem><Link to={'/ItemUpload'}>Ingresar artículos</Link></MenuItem> */}
                  <MenuItem><Link to={'/Cart'}>Carrito de compras: {cart.length}</Link></MenuItem>
                  <MenuItem isDisabled={true}>Pedidos realizados</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handlerCierreSesion}>Cerrar sesión</MenuItem>
                </MenuList>
              </Menu> :
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'md'}
                    src={
                      '../src/img/icons/profile_no_logueado.png'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem><Link to={'/LogIn'}>LogIn / SignUp</Link></MenuItem>
                </MenuList>
              </Menu>
            }
          </Flex>
        </Flex>

        
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4} className='pilaHorizontal-personal'>
              <Link to={'/ListadoProductos'}>Productos</Link>
              <Menu>
                  <MenuButton className='menuButton-personal'>Marcas</MenuButton>
                  <MenuList>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/stanley'}>Stanley</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/bahco'}>Bahco</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/skill'}>Skill</Link></MenuItem>
                    {/* <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/makita'}>Makita</Link></MenuItem> */}
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/generico'}>Genéricas</Link></MenuItem>
                </MenuList>
                </Menu>
            </Stack>
          </Box>
        ) : null}

      </Box>
    </div>
  )
}

export default NavBar;