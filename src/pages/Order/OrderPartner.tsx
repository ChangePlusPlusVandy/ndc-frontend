import { Group, Tabs, Modal, MultiSelect, Button, Image, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import Order from './OrderClass';
import OrderTable from './OrderTable';
import Filter from './Filters';
import Sorter from './Sorters';
import OrderForm from '../OrderForm/OrderForm';
import "./OrderPartner.css";
import ndcLogo from '../../assets/ndc-logo.png';
import { useAuth } from "../../AuthContext";

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

const OrderPartner: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [targetSizes, setTargetSizes] = useState<number[]>([]);
    const { mongoId, currentUser } = useAuth();

    useEffect(() => {
        const getOrders = async () => {
            const token = await currentUser?.getIdToken();

            let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order?partnerId=${mongoId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            let data = (await res.json()).map((elem: OrderResponse) => {
                return new Order(
                    elem._id,
                    elem.partner, 
                    new Date(elem.datePlaced),
                    new Date(elem.dateCompleted) || new Date(),
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
        }
        getOrders();
    }, [])


    return (
        <main>
            <Group justify='space-between' className='width-90 modButtons'>
                <Filter baseOrders={orders} setOrders={setOrders} classes=''></Filter>
                <Sorter orders={orders} setOrders={setOrders} whichSorters={["Date", "Num"]} classes={"whiteButton"}></Sorter>
            </Group>

            <Tabs variant='unstyled' defaultValue={"open"} className="width-90">
                <Tabs.List grow>
                    <Tabs.Tab className="tableHeader tab" value="open">Open</Tabs.Tab>
                    <Tabs.Tab className="tableHeader tab" value="review">Under Review</Tabs.Tab>
                    <Tabs.Tab className="tableHeader tab" value="approved">Approved</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="open">
                    <OrderTable orders={orders} orderType={"OPEN"}></OrderTable>
                </Tabs.Panel>

                <Tabs.Panel value="review">
                    <OrderTable orders={orders} orderType={"PLACED"}></OrderTable>
                </Tabs.Panel>

                <Tabs.Panel value="approved">
                    <OrderTable orders={orders} orderType={"OPEN"}></OrderTable>
                </Tabs.Panel>
            </Tabs>

            <div className="buttonContain width-90">
                <OrderForm isDashboardButton={false} opened={opened} open={open} close={close} />

            </div>

        </main>

    );
};

export default OrderPartner;

