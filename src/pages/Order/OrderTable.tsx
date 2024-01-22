import React, { useEffect, useState } from 'react';
import Order from './OrderClass';
import "./OrderPartner.css";

interface TableProps {
    orders: Order[],
    orderType: string,
}

const OrderTable: React.FC<TableProps> = ({ orders, orderType }: TableProps) => {
    useEffect(() => {
        const getOrders = async () => {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/INSERT_PATH_HERE`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderType),
            })
                .then((response) => (response.json()))
                .then((data) => {
                    orders = [];
                    data.forEach((elem: any) => {
                        orders.push(new Order(elem.datePlaced, elem.status, elem.newborn, elem.size1,
                            elem.size2, elem.size3, elem.size4, elem.size5, elem.size6));
                    })
                })
                .catch(console.error);
        }
        // getOrders();
    }, [])

    return (
        <div>
            <div>
                <div>
                    <p>Order</p>
                    <p>Date Placed</p>
                    <p>Number of Diapers</p>
                </div>
            </div>
            <div>
                {orders?.map((val: Order, index: number) => {
                    return (
                        <p key={index} className="backWhite">
                            <p>Order</p>
                            <p>{val.datePlaced.toDateString()}</p>
                            <p>{val.numDiapers}</p>
                            <p>...</p>
                        </p>
                    )
                })}
                <div>
                    <p>temp</p>
                    <p>temp</p>
                    <p>temp</p>
                </div>
            </div>

        </div>
    );
}

export default OrderTable; 
