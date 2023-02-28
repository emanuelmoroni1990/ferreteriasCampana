// Bootstrap para React
// https://getbootstrap.com/docs/5.3/getting-started/javascript/#usage-with-javascript-frameworks
// https://react-bootstrap.github.io/getting-started/introduction
// https://www.youtube.com/watch?v=s3_FgB0TFC8

// Chakra
// Instalacion de iconos: https://chakra-ui.com/docs/components/icon
// Template utilizado: https://chakra-templates.dev/navigation/navbar
// useDisclousure hook: https://chakra-ui.com/docs/hooks/use-disclosure
// https://stackoverflow.com/questions/70159125/how-do-i-show-a-modal-box-on-page-load-using-chakra-ui


// Imagenes: unsplash, flaticon

import '../styles/style.css'
import React from 'react';
import { Link } from 'react-router-dom'
import { Box, Flex, Avatar, HStack, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

const NavBar = () => {

  // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios. It can be used to control feedback component such as Modal, AlertDialog, Drawer, etc.
  // The useDisclosure hook returns an object with the following fields:
  // isOpen => If true, it sets the controlled component to its visible state.
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            // onClose => Callback function to set a falsy value for the isOpen parameter.
            // onOpen => Callback function to set a truthy value for the isOpen parameter.
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
                {/* <Link to={'#'}>Marcas</Link> */}
                <Menu>
                  <MenuButton className='menuButton-personal'>Marcas</MenuButton>
                  <MenuList>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/stanley'}>Stanley</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/bahco'}>Bahco</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/bosch'}>Bosch</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/makita'}>Makita</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/generico'}>Genéricas</Link></MenuItem>
                </MenuList>
                </Menu>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* Este boton por el momentos no tiene utilidad, de manera que lo dejo comentado. Ver su aplicacion en etapas posteriores del proyecto. */}
            {/* <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} leftIcon={<AddIcon/>}>Action</Button> */}
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
                    '../src/img/icons/profile.png'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Editar perfil</MenuItem>
                <MenuItem>Compras realizadas (5)</MenuItem>
                <MenuDivider />
                <MenuItem>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
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
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/bosch'}>Bosch</Link></MenuItem>
                    <MenuItem className='menuButton-personal'><Link to={'/MarcasProductos/makita'}>Makita</Link></MenuItem>
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