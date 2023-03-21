import React, {createContext, useState} from 'react'

export const CartContext = createContext(null);

const ShoppingCartContext = ({children}) => {

    let user, admin;

    if((localStorage.getItem("usuarioConectado") == null) && (localStorage.getItem("adminConectado") == null)){
        localStorage.setItem("usuarioConectado", false);
        localStorage.setItem("adminConectado", false);
    }
    else{
        user = localStorage.getItem("usuarioConectado");
        if(user == "false") user = false;
        if(user == "true") user = true;
        // console.log(user);

        admin = localStorage.getItem("adminConectado");
        if(admin == "false") admin = false;
        if(admin == "true") admin = true;
        // console.log(admin);
    }    

    const [cart, setCart] = useState([]);
    const [usuarioConectado, setUsuarioConectado] = useState(user);
    const [adminConectado, setAdminConectado] = useState(admin);    

    return (
        <CartContext.Provider value={{cart, setCart, usuarioConectado, setUsuarioConectado, adminConectado, setAdminConectado}}>
            {children}
        </CartContext.Provider>
    )
}

export default ShoppingCartContext;