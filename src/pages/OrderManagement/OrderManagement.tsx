import React, {useState, useEffect} from "react"; 
import {Group, Button, Autocomplete} from "@mantine/core"; 
import StaffOrderTable from "./StaffOrderTable";
import {useAuth} from "../../AuthContext";
import { IconSearch, IconArrowsDownUp } from "@tabler/icons-react";
import Order from "../Order/OrderClass";
import Filter from "../Order/Filters";
import "../../styles/OrderManagement.css";

interface OrderResponse {
    _id: string;
    dateCompleted: string;
    datePlaced: string;
    newborn: number;
    numDiapers: number;
    partner: string;
    size1: number;
    size2: number;
    size3: number;
    size4: number;
    size5: number;
    size6: number;
    status: string;
}

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]); 
    const [shownOrders, setShownOrders] = useState<Order[]>([]); 
    const [asc, setAsc] = useState<Boolean>(true); 
    const [searchVal, setSearchVal] = useState(""); 
    const {currentUser} = useAuth(); 

    useEffect(() => {
        const getOrders = async () => {
            const token = await currentUser?.getIdToken();

            let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            
            let data = (await res.json()).map((elem: OrderResponse) => {
                return new Order(
                    elem._id,
                    new Date(elem.datePlaced), 
                    new Date(elem.dateCompleted),
                    elem.status, 
                    elem.newborn, 
                    elem.size1,
                    elem.size2, 
                    elem.size3,
                    elem.size4, 
                    elem.size5,
                    elem.size6,
                )
            });
            setOrders(data);
            setShownOrders(data); 
        }

        getOrders();
    }, [])

    const sort = () => {
        let orderCopy: Order[] = shownOrders.slice(); 
        if (asc) orderCopy.sort((a, b) => (a.id < b.id ? -1 : 1)); 
        else orderCopy.sort((a, b) => (a.id > b.id ? -1 : 1));
        
        setAsc(!asc); 
        setShownOrders(orderCopy); 
    }

    const searchBar = (value: string) => {
        setSearchVal(value);

        let orderCopy: Order[] = []; 

        orders.forEach((order: Order) => {
            if (order.id.includes(searchVal) ||  
            order.datePlaced.toDateString().includes(searchVal) || order.numDiapers.toString().includes(searchVal) || order.status.includes(searchVal)) {
                orderCopy.push(order); 
            }
        });
        
        setShownOrders(orderCopy); 
    }

    return (
        <main className="page-wrapper">
            <h1>Order Management</h1>
            <Group justify="space-between" className="modifiers">
                <div>
                    <Filter baseOrders={orders} setOrders={setShownOrders} classes="mod-button"></Filter>
                    <Button className="mod-button" onClick={sort}><IconArrowsDownUp></IconArrowsDownUp></Button>
                </div>
                
                <Autocomplete leftSection={<IconSearch></IconSearch>} data={[]} value={searchVal} onChange={searchBar}></Autocomplete>
            </Group>
            <StaffOrderTable orders={shownOrders}></StaffOrderTable>
        </main>
        
    ); 
}

export default OrderManagement; 