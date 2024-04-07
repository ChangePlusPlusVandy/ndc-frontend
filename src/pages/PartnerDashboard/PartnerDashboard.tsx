import React, { useState, useEffect } from "react";
import {
    Checkbox,
    Table,
    Button,
    Title,
    Grid,
    Stack,
    Flex,
    Text,
    Container,
    Card,
} from "@mantine/core";
import Order from "../OrderTracking/OrderClass";
import { useDisclosure } from "@mantine/hooks";
import { LineChart } from "@mantine/charts";
import { IconCircleFilled, IconCircle } from "@tabler/icons-react";
import OrderTable from "../OrderTracking/OrderTable";

// Importing dashboard components
import Greeting from "./Greeting";
import MyAccountBtn from "./MyAccountBtn";
import ViewOrderBtn from "./ViewOrderBtn";
import { useNavigate } from "react-router-dom";
import "../../styles/PartnerDash.css";
import { useAuth } from "../../AuthContext";
import { IconCheck, IconMailOpened, IconBell } from "@tabler/icons-react";
import OrderForm from "../OrderForm/OrderForm";
import { string } from "yup";

export const data = [
    {
        date: "Mar 22",
        Orders: 245,
    },
    {
        date: "Mar 23",
        Orders: 956,
    },
    {
        date: "Mar 24",
        Orders: 2500,
    },
    {
        date: "Mar 25",
        Orders: 3470,
    },
    {
        date: "Mar 26",
        Orders: 3129,
    },
];

// Delete
import Partner from "./PartnerClass";

interface PartnerResponse {
    numOrdersMonth: number;
    numOrdersYTD: number;
    status: string;
}

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

function Dashboard() {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const { mongoId, currentUser } = useAuth();

    // NEW, GRAPH DATA
    const [numOrdersMonth, setNumOrdersMonth] = useState<number>(0);
    const [numOrdersYTD, setNumOrdersYTD] = useState<number>(0);

    // DELEETE, SIDE BAR DATA
    const [numOpenOrders, setNumOpenOrders] = useState<number>(0);
    const [numUnreviewedOrders, setNumUnreviewedOrders] = useState<number>(0);
    const [numClosedOrders, setNumClosedOrders] = useState<number>(0);
    const [orders, setOrders] = useState<Order[]>([]);

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
        };
        if (currentUser && mongoId) {
            getOrders();
            console.log("Mongo", mongoId);
        }
    }, []);
    useEffect(() => {
        // Line old
        console.log(currentUser);

        const getPartnerOrders = async () => {
            try {
                const token = await currentUser?.getIdToken();

                let resPartner = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/partner?id=${mongoId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                let resOrders = await fetch(
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

                let dataOrders = (await resOrders.json()).map(
                    (elem: OrderResponse) => {
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
                    }
                );
                setOrders(dataOrders);

                let dataPartner = await resPartner.json();
                let numOrdersMonthArr = dataPartner.numOrdersMonth;
                let numOrdersYTDArr = dataPartner.numOrdersYTD;

                let numOrdersOpen = dataOrders.filter(
                    (elem: PartnerResponse) => elem.status === "OPEN"
                ).length;
                let numOrdersUnreviewed = dataOrders.filter(
                    (elem: PartnerResponse) => elem.status === "UNREVIEWED"
                ).length;
                let numOrdersClosed = dataOrders.filter(
                    (elem: PartnerResponse) => elem.status === "FILLED"
                ).length;

                setNumOrdersMonth(numOrdersMonthArr);
                setNumOrdersYTD(numOrdersYTDArr);
                setNumOpenOrders(numOrdersOpen);
                setNumUnreviewedOrders(numOrdersUnreviewed);
                setNumClosedOrders(numOrdersClosed);

                // TEST
                console.log("numOrdersMonthArr:", numOrdersMonthArr);
                console.log("numOrdersYTDArr:", numOrdersYTDArr);
                console.log("numOrdersClkosed:", numOrdersClosed);
            } catch (err) {
                console.error(err);
            }
        };
        if (mongoId && currentUser) {
            getPartnerOrders();
        }
    }, []);

    const handleProfile = () => {
        navigate("./profile");
    };
    const handleOrderInfo = () => {
        navigate("./order-info");
    };

    const fakeTable = [
        {
            orderNumber: 2309840293840,
            distributionPlace: "Location",
            date: "01/01/24",
            totalQuantity: 150,
            orderStatus: "Unreviewed",
        },
        {
            orderNumber: 2309840293841,
            distributionPlace: "Location",
            date: "01/02/24",
            totalQuantity: 150,
            orderStatus: "Unreviewed",
        },
        {
            orderNumber: 2309840293842,
            distributionPlace: "Location",
            date: "01/03/24",
            totalQuantity: 150,
            orderStatus: "Unreviewed",
        },
        {
            orderNumber: 2309840293843,
            distributionPlace: "Location",
            date: "01/04/24",
            totalQuantity: 150,
            orderStatus: "Unreviewed",
        },
        {
            orderNumber: 2309840293844,
            distributionPlace: "Location",
            date: "01/05/24",
            totalQuantity: 150,
            orderStatus: "Unreviewed",
        },
    ];

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const rows = fakeTable.map((element) => (
        <Table.Tr
            key={element.orderNumber}
            bg={
                selectedRows.includes(element.orderNumber)
                    ? "var(--highlight-color)"
                    : undefined
            }
        >
            <Table.Td>
                <Checkbox
                    aria-label="Select row"
                    color="var(--secondary-color)"
                    checked={selectedRows.includes(element.orderNumber)}
                    onChange={(event) =>
                        setSelectedRows(
                            event.currentTarget.checked
                                ? [...selectedRows, element.orderNumber]
                                : selectedRows.filter(
                                      (orderNumber) =>
                                          orderNumber !== element.orderNumber
                                  )
                        )
                    }
                />
            </Table.Td>
            <Table.Td ta="center">{element.orderNumber}</Table.Td>
            <Table.Td ta="center">{element.distributionPlace}</Table.Td>
            <Table.Td ta="center">{element.date}</Table.Td>
            <Table.Td ta="end">{element.totalQuantity}</Table.Td>
            <Table.Td>
                <Flex justify="center" gap="md" align={"center"}>
                    <IconCircle
                        className={
                            element.orderStatus == "Unreviewed"
                                ? "unreviewed-icon"
                                : element.orderStatus == "Open"
                                ? "open-icon"
                                : "approved-icon"
                        }
                        size=".75rem"
                    />
                    <Text>{element.orderStatus}</Text>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Flex p="lg" wrap="wrap" justify="space-between" align="center">
                <Greeting />
                <OrderForm
                    isDashboardButton={true}
                    opened={opened}
                    open={open}
                    close={close}
                />
            </Flex>
            <Grid p="lg" grow gutter="md" justify="center" align="stretch">
                <Grid.Col
                    className="grid-col"
                    span={{ base: 12, sm: 6, md: 9 }}
                >
                    <Flex
                        justify="space-between"
                        flex="1"
                        className="dashboard-box"
                        p="md"
                        direction="column"
                    >
                        <Text className="mantine-Subtitle-root">Orders</Text>

                        <Flex p="lg" justify="center">
                            <LineChart
                                h={300}
                                data={data}
                                dataKey="date"
                                series={[
                                    {
                                        name: "Orders",
                                        color: "var(--primary-color)",
                                    },
                                ]}
                                curveType="natural"
                                withDots={false}
                            />
                        </Flex>
                    </Flex>
                </Grid.Col>

                <Grid.Col className="grid-col" span={{ base: 12, sm: 3 }}>
                    <Flex
                        justify="stretch"
                        gap="md"
                        p="0"
                        flex="1"
                        direction={{ base: "column", xs: "row", sm: "column" }}
                        align="stretch"
                    >
                        <Flex
                            flex="1"
                            justify="space-between"
                            ta="center"
                            p="md"
                            gap="md"
                            direction="column"
                            className="dashboard-box"
                        >
                            <Title>100</Title>
                            <Text>Last Month</Text>
                        </Flex>
                        <Flex
                            flex="1"
                            justify="space-between"
                            ta="center"
                            p="md"
                            gap="md"
                            direction="column"
                            className="dashboard-box"
                        >
                            <Title>50</Title>

                            <Text>Last 6 Months</Text>
                        </Flex>
                        <Flex
                            flex="1"
                            justify="space-between"
                            ta="center"
                            p="md"
                            gap="md"
                            direction="column"
                            className="dashboard-box"
                        >
                            <Title>25</Title>

                            <Text>All Time</Text>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col className="grid-col" span={12}>
                    <Flex
                        className="dashboard-box"
                        direction="column"
                        flex="1"
                        p="md"
                    >
                        <Flex
                            justify="space-between"
                            gap="md"
                            flex="1"
                            align="center"
                            direction="row"
                        >
                            <Text className="mantine-Subtitle-root">
                                Recent Orders
                            </Text>
                            <Button
                                variant="subtle"
                                size="sm"
                                color="var(--primary-color)"
                                onClick={handleOrderInfo}
                            >
                                View All
                            </Button>
                        </Flex>
                        <OrderTable
                            orders={orders}
                            orderTypes={[
                                "OPEN",
                                "PLACED",
                                "APPROVED",
                                "FILLED",
                                "CANCELLED",
                            ]}
                            amount={5}
                            showPagination={false}
                        />
                    </Flex>
                </Grid.Col>
            </Grid>
        </>
    );
}

export default Dashboard;
