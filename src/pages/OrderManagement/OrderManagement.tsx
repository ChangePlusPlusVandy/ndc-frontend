import React, { useState, useEffect } from "react";
import { Group, Button, Autocomplete } from "@mantine/core";
import StaffOrderTable from "./StaffOrderTable";
import { useAuth } from "../../AuthContext";
import { IconSearch, IconArrowsDownUp } from "@tabler/icons-react";
import Order from "../Order/OrderClass";
import Filter from "../Order/Filters";
import Sorter from "../Order/Sorters";
import "../../styles/OrderManagement.css";
import SearchBar from "../UserDirectory/Searchbar";

interface PartnerType {
    _id: string,
    firstName: string,
    lastName: string
}

interface OrderResponse {
    _id: string,
    partner: PartnerType,
    dateCompleted: string;
    datePlaced: string;
    numDiapers: number;
    newborn: number;
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
    const [searchVal, setSearchVal] = useState("");
    const { currentUser } = useAuth();

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
                    elem.partner ? (elem.partner.firstName + " " + elem.partner.lastName) : "Unknown",
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

    const reverse = () => {
        let orderCopy: Order[] = shownOrders.slice();
        orderCopy.reverse();
        setShownOrders(orderCopy);
    }

    const searchFunc = (value: string) => {
        setSearchVal(value);

        let orderCopy: Order[] = [];

        orders.forEach((order: Order) => {
            if (order.partner.toLowerCase().includes(value.toLowerCase()) ||
                order.datePlaced.toDateString().includes(value) ||
                order.numDiapers.toString().includes(value) ||
                order.status.includes(value.toUpperCase())) {
                orderCopy.push(order);
            }
        });

        setShownOrders(orderCopy);
    }

    return (
        <div className="page-wrapper">
            <h1>Order Management</h1>
            <Group justify="space-between" className="modifiers">
                <div>
                    <Filter baseOrders={orders} setOrders={setShownOrders} classes="mod-button"></Filter>
                    <Sorter orders={orders} setOrders={setShownOrders} classes="mod-button" whichSorters={["OrderName", "PartnerName", "Date", "Num", "Status"]}></Sorter>
                    <Button className="mod-button" onClick={reverse}><IconArrowsDownUp></IconArrowsDownUp></Button>
                </div>

                <SearchBar searchVal={searchVal} searchFunc={searchFunc}></SearchBar>
            </Group>
            <StaffOrderTable orders={shownOrders}></StaffOrderTable>
        </div>

    );
}

export default OrderManagement; 
