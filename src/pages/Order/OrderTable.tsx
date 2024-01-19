import React, {useEffect, useState} from 'react';
import Order from './OrderClass'; 
import "./OrderPartner.css";  

interface TableProps {
    orders: Order[], 
    orderType: string,
}

const OrderTable: React.FC<TableProps> = ({orders, orderType}: TableProps) => {

    useEffect(() => {
        const getOrders = async () => {
            fetch("${import.meta.env.VITE_BACKEND_URL}/INSERT_PATH_HERE", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderType),
                })
                .then((response) => (response.json()))
                .then ((data) => {
                    orders = []; 
                    data.forEach((elem: any) => {
                        orders.push(new Order(elem.datePlaced, elem.status, elem.newborn, elem.size1, 
                            elem.size2, elem.size3, elem.size4, elem.size5, elem.size6)); 
                    }) 
                })
                .catch(console.error); 
        }
        getOrders(); 
    }, [])

    return (
        <table>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Date Placed</th>
                        <th>Number of Diapers</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((val: Order, index: number) => {
                        return (
                            <tr key={index} className="backWhite">
                                <td>Order</td>
                                <td>{val.datePlaced.toDateString()}</td>
                                <td>{val.numDiapers}</td>
                                <td>...</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                    </tr>
                </tbody>
                
        </table>
    )
}

export default OrderTable; 