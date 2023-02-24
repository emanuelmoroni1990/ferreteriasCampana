// Bootstrap para React
// https://getbootstrap.com/docs/5.3/getting-started/javascript/#usage-with-javascript-frameworks
// https://react-bootstrap.github.io/getting-started/introduction
// https://www.youtube.com/watch?v=s3_FgB0TFC8

// Chakra
// Instalacion de iconos: https://chakra-ui.com/docs/components/icon
// Template utilizado: https://chakra-templates.dev/navigation/navbar

// Imagenes: unsplash, flaticon

import React from 'react';
import { Box, Flex, Avatar, HStack, Link, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({children}) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

const NavBar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Avatar
                  size={'md'}
                  src={
                    'src/img/icons/tool-box.png'
                  }
                />
            {/* Decomentar para ingresar el nombre de la marcar. Aplicar estilos para que queden centrados juntos. */}
            {/* <Box>Logo</Box> */}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <NavLink>Dashboard</NavLink>
              <NavLink>Projects</NavLink>
              <NavLink>Team</NavLink>
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
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  )
}

export default NavBar;