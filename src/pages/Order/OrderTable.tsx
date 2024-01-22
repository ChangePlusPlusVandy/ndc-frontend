import React, { useEffect, useState } from 'react';
import Order from './OrderClass';
import "./OrderPartner.css";


interface TableProps {
    orders: Order[],
    orderType: string,
}

const OrderTable: React.FC<TableProps> = ({ orders, orderType }: TableProps) => {


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
