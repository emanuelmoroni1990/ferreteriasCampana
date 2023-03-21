import React, { useState, useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { Spinner } from '@chakra-ui/react';
import Order from './Order';

const OrderContainer = () => {

    const[orderId, setOrderId] = useState([]);

    useEffect(() => {
        // const db = getFirestore();
        // const orderRef = collection(db, "pedidosClientes");
        // const auth = getAuth();
        // const user = auth.currentUser;
        // console.log(user.email);

        // if(user){
        //     // Create a query against the collection.
        //     const queryEmail = query(orderRef, where("usuario", "==", user.email));

        //     getDocs(queryEmail).then((querySnapshot) => 
        //     {
        //         querySnapshot.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //         setOrderId([...orderId, doc.id]);
        //     }).catch((error) => console.log(error));
            
        //     }
        //     );
        // }        
    },[]);

    const orderList = orderId.map
    (order =>
        <Order 
            key={orderId.indexOf(order)}
            orderId={order}>
        </Order>
    );

    return (
        <div>
            {/* <Order orderId={orderId}></Order> */}
            { orderId.length > 0 ?
                orderList :
                <div className='personal-spinner'>
                    <Spinner
                        thickness='4px'
                        speed='1.5s'
                        emptyColor='gray.200'
                        size='xl'
                    />
                </div>
            }
        </div>
    )
}

export default OrderContainer