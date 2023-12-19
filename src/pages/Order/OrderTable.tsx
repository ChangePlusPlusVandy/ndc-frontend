import React, {useEffect, useState} from 'react';
import "./OrderPartner.css";  

interface TableProps {
    orderType: string,
}

class Order {
    datePlaced: Date;
    status: string; 
    numDiapers: number; 

    constructor(datePlaced=new Date(), status="", numDiapers=0) {
        this.datePlaced = datePlaced; 
        this.status = status; 
        this.numDiapers = numDiapers; 
    }
}

const OrderTable: React.FC<TableProps> = (props: TableProps) => {
    const [orders, setOrders] = useState<Order[]>([]); 
    
    useEffect(() => {
        const getOrders = async () => {
            fetch("http://localhost:3001/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(props),
                })
                .then((response) => (response.json()))
                .then ((data) => {
                    let temp: Order[] = []; 
                    data.forEach((elem: any) => {
                        temp.push(new Order(elem.datePlaced, elem.numDiapers)); 
                    }) 

                    setOrders(temp); 
                })
                .catch(console.error); 
        }
        getOrders(); 
    }, [])

    return (
        <table>
                <tr>
                    <th>Order</th>
                    <th>Date Placed</th>
                    <th>Number of Diapers</th>
                </tr>
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
        </table>
    )
}

export default OrderTable; 