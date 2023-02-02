// https://getbootstrap.com/docs/5.3/getting-started/javascript/#usage-with-javascript-frameworks
// https://react-bootstrap.github.io/getting-started/introduction
// https://www.youtube.com/watch?v=s3_FgB0TFC8

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from './CartWidget';
import ItemListContainer from './ItemListContainer';

const NavBar = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Ferretería Moroni</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <CartWidget></CartWidget>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown> */}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <ItemListContainer greeting={"Destornillador"}></ItemListContainer>
    </div>   
  )
}

export default NavBar;