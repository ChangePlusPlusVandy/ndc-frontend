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
import { IconSearch, IconX } from "@tabler/icons-react";

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
    const { mongoId, currentUser } = useAuth();
    const [orderTypes, setOrderTypes] = useState<string[]>([
        "OPEN",
        "APPROVED",
        "CANCELLED",
        "FILLED",
    ]);

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

            console.log("DATA", data);
            setOrders(data);
        };
        if (currentUser && mongoId) {
            getOrders();
            console.log("Mongo", mongoId);
        }
    }, []);

    const changeOrderType = (value: string) => {
        let temp: string[] = orderTypes.slice();
        if (!orderTypes.includes(value)) {
            temp.push(value);
            if (value == "OPEN") {
                temp.push("PLACED");
            }
        } else {
            temp.splice(temp.indexOf(value), 1);
            if (value == "OPEN") {
                temp.splice(temp.indexOf("PLACED"), 1);
            }
        }
        setOrderTypes(temp);
    };

    return (
        <Flex p="lg" direction="column" align="stretch" gap="lg">
            <Title c="black" ta={{ base: "center", sm: "left" }}>
                Order Tracking
            </Title>
            <Flex
                justify="space-between"
                className="dashboard-box"
                p="md"
                direction="row"
            >
                <Group align="center">
                    <TextInput
                        className="searchInput"
                        placeholder="Search"
                        leftSection={<IconSearch size="1rem" />}
                        size="xs"
                    ></TextInput>
                    <Button
                        justify="stretch"
                        display="block"
                        className={
                            "stretch-button tab" +
                            (orderTypes.includes("OPEN")
                                ? " primary-button filters-item-selected"
                                : "")
                        }
                        variant="transparent"
                        ta="start"
                        size="xs"
                        onClick={() => changeOrderType("OPEN")}
                    >
                        <Flex
                            flex="1"
                            gap="xs"
                            align="center"
                            justify={"stretch"}
                        >
                            Unreviewed
                            {orderTypes.includes("OPEN") && (
                                <Flex flex="1" justify={"end"}>
                                    <IconX size="1rem" />
                                </Flex>
                            )}
                        </Flex>
                    </Button>
                    <Button
                        justify="stretch"
                        display="block"
                        className={
                            "stretch-button tab" +
                            (orderTypes.includes("APPROVED")
                                ? " primary-button filters-item-selected"
                                : "")
                        }
                        variant="transparent"
                        ta="start"
                        size="xs"
                        onClick={() => changeOrderType("APPROVED")}
                    >
                        <Flex
                            flex="1"
                            gap="sm"
                            align="center"
                            justify={"stretch"}
                        >
                            In progress
                            {orderTypes.includes("APPROVED") && (
                                <Flex flex="1" justify={"end"}>
                                    <IconX size="1rem" />
                                </Flex>
                            )}
                        </Flex>
                    </Button>
                    <Button
                        justify="stretch"
                        display="block"
                        className={
                            "stretch-button tab" +
                            (orderTypes.includes("CANCELLED")
                                ? " primary-button filters-item-selected"
                                : "")
                        }
                        variant="transparent"
                        ta="start"
                        size="xs"
                        onClick={() => changeOrderType("CANCELLED")}
                    >
                        <Flex
                            flex="1"
                            gap="xs"
                            align="center"
                            justify={"stretch"}
                        >
                            Cancelled
                            {orderTypes.includes("CANCELLED") && (
                                <Flex flex="1" justify={"end"}>
                                    <IconX size="1rem" />
                                </Flex>
                            )}
                        </Flex>
                    </Button>
                    <Button
                        justify="stretch"
                        display="block"
                        className={
                            "stretch-button tab" +
                            (orderTypes.includes("FILLED")
                                ? " primary-button filters-item-selected"
                                : "")
                        }
                        variant="transparent"
                        ta="start"
                        size="xs"
                        onClick={() => changeOrderType("FILLED")}
                    >
                        <Flex
                            flex="1"
                            gap="xs"
                            align="center"
                            justify={"stretch"}
                        >
                            Filled
                            {orderTypes.includes("FILLED") && (
                                <Flex flex="1" justify={"end"}>
                                    <IconX size="1rem" />
                                </Flex>
                            )}
                        </Flex>
                    </Button>
                </Group>
                <Group flex="1" gap="xs" justify="end">
                    <Filter
                        baseOrders={orders}
                        setOrders={setOrders}
                        classes=""
                    ></Filter>
                    <Sorter
                        orders={orders}
                        setOrders={setOrders}
                        whichSorters={["Date", "Num"]}
                        classes={""}
                    ></Sorter>
                </Group>
            </Flex>

            <Flex
                justify="space-between"
                className="dashboard-box"
                p="md"
                direction="column"
            >
                <OrderTable
                    orders={orders}
                    amount={10}
                    showPagination={true}
                    orderTypes={orderTypes}
                />
            </Flex>
        </Flex>
    );
};

export default OrderPartner;
