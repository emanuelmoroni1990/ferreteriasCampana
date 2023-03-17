import React, {createContext, useState} from 'react'

export const CartContext = createContext(null);

const ShoppingCartContext = ({children}) => {

    const [cart, setCart] = useState([]);
    const [usuarioConectado, setUsuarioConectado] = useState(false);
    const [adminConectado, setAdminConectado] = useState(false);

    return (
        <CartContext.Provider value={{cart, setCart, usuarioConectado, setUsuarioConectado, adminConectado, setAdminConectado}}>
            {children}
        </CartContext.Provider>
    )
}

export default ShoppingCartContext;