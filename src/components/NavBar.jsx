// Bootstrap para React
// https://getbootstrap.com/docs/5.3/getting-started/javascript/#usage-with-javascript-frameworks
// https://react-bootstrap.github.io/getting-started/introduction
// https://www.youtube.com/watch?v=s3_FgB0TFC8

// Chakra
// Instalacion de iconos: https://chakra-ui.com/docs/components/icon
// Template utilizado: https://chakra-templates.dev/navigation/navbar

// Imagenes: unsplash, flaticon

import '../styles/style.css'
import React from 'react';
import { Link } from 'react-router-dom'
import { Box, Flex, Avatar, HStack, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

const NavBar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} className='navbar-personal'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
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
                    'src/img/icons/tool-box.png'
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
                <Link to={'#'}>Marcas</Link>
                <Link to={'#'}>Equipo</Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* Este boton por el momentos no tiene utilidad, de manera que lo dejo comentado. Ver su aplicacion en etapas posteriores del proyecto. */}
            {/* <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon/>}>
              Action
            </Button> */}
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
                    'src/img/icons/profile.png'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Editar perfil</MenuItem>
                <MenuItem>Compras realizadas</MenuItem>
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
              <Link to={'#'}>Marcas</Link>
              <Link to={'#'}>Equipo</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  )
}

export default NavBar;