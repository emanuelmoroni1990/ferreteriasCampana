// https://react-bootstrap.github.io/components/badge/

import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const CartWidget = () => {
  return (
    <Button variant="primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16" style={{paddingRight: "10px"}}>
            <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
        </svg>
        <Badge bg="secondary">9</Badge>
        {/* <span className="visually-hidden">unread messages</span> */}
    </Button>    
  )
}

export default CartWidget;