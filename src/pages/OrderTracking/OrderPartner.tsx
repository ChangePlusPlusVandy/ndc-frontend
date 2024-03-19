import {
    Group,
    Tabs,
    Flex,
    Title,
    Text,
    TextInput,
    Button,
    Pagination,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import Order from "./OrderClass";
import OrderTable from "./OrderTable";
import Filter from "./Filters";
import Sorter from "./Sorters";
import OrderForm from "../OrderForm/OrderForm";
import { IconSearch } from "@tabler/icons-react";

import "../../styles/OrderTracking.css";
import ndcLogo from "../../assets/ndc-logo.png";
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

            console.log("TOKEN", token);
            console.log("MONGOID", mongoId);

            let res = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/order?partnerId=${mongoId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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
                    elem.size6
                );
            });
            setOrders(data);
        };
        if (currentUser && mongoId) {
            getOrders();
        }
    }, []);

    return (
        <Tabs variant="pills" defaultValue={"open"}>
            <Flex
                p="lg"
                wrap="wrap"
                direction="column"
                align="stretch"
                gap="lg"
            >
                <Title c="black" ta={{ base: "center", sm: "left" }}>
                    Order Tracking
                </Title>
                <Flex
                    justify="space-between"
                    className="dashboard-box"
                    p="md"
                    direction="row"
                >
                    <Group>
                        <TextInput
                            className="searchInput"
                            placeholder="Search"
                            leftSection={<IconSearch size="1rem" />}
                            size="xs"
                        ></TextInput>
                        <Tabs.List grow>
                            <Tabs.Tab value="unapproved" className="tab">
                                Unapproved
                            </Tabs.Tab>
                            <Tabs.Tab value="review" className="tab">
                                Unreviewed
                            </Tabs.Tab>
                            <Tabs.Tab value="open" className="tab">
                                Opened
                            </Tabs.Tab>
                            <Tabs.Tab value="approved" className="tab">
                                Delivered
                            </Tabs.Tab>
                        </Tabs.List>
                    </Group>
                    <Group>
                        <Filter
                            baseOrders={orders}
                            setOrders={setOrders}
                            classes=""
                        ></Filter>
                        <Sorter
                            orders={orders}
                            setOrders={setOrders}
                            whichSorters={["Date", "Num"]}
                            classes={"whiteButton"}
                        ></Sorter>
                    </Group>
                </Flex>

                <Flex
                    justify="space-between"
                    className="dashboard-box"
                    p="md"
                    direction="column"
                >
                    <Tabs.Panel value="open">
                        <OrderTable
                            orders={orders}
                            orderType={"OPEN"}
                        ></OrderTable>
                    </Tabs.Panel>
                    <Tabs.Panel value="review">
                        <OrderTable
                            orders={orders}
                            orderType={"PLACED"}
                        ></OrderTable>
                    </Tabs.Panel>
                    <Tabs.Panel value="approved">
                        <OrderTable
                            orders={orders}
                            orderType={"OPEN"}
                        ></OrderTable>
                    </Tabs.Panel>
                    <Flex justify="center">
                        <Pagination
                            total={10}
                            classNames={{ control: "orderPagination" }}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Tabs>
    );
};

export default OrderPartner;
