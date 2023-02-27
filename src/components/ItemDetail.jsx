import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'

const ItemDetail = ({ nombre, categoria, subcategoria, descripcion }) => {

    // Ver el uso del hook useDisclosure en el desarrollo del navbar.
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    console.log(isOpen);

    return (
        <div>
            <Modal isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{nombre}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {descripcion}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        <Link to="/ListadoProductos">Close</Link>
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
            </Modal> 
        </div>
    )
}

export default ItemDetail;