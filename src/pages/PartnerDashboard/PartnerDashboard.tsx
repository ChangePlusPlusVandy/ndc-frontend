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
import { useDisclosure } from "@mantine/hooks";
import { LineChart } from "@mantine/charts";

// Importing dashboard components
import Greeting from "./Greeting";
import MyAccountBtn from "./MyAccountBtn";
import ViewOrderBtn from "./ViewOrderBtn";
import { useNavigate } from "react-router-dom";
import "../../styles/PartnerDash.css";
import { useAuth } from "../../AuthContext";
import { IconCheck, IconMailOpened, IconBell } from "@tabler/icons-react";

import OrderForm from "../OrderForm/OrderForm";

export const data = [
    {
        date: "Mar 22",
        Orders: 2890,
    },
    {
        date: "Mar 23",
        Orders: 2756,
    },
    {
        date: "Mar 24",
        Orders: 3322,
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

function Dashboard() {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const { currentUser } = useAuth();
    useEffect(() => {
        console.log(currentUser);
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
                    ? "var(--mantine-color-blue-light)"
                    : undefined
            }
        >
            <Table.Td>
                <Checkbox
                    aria-label="Select row"
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
            <Table.Td>{element.orderNumber}</Table.Td>
            <Table.Td>{element.distributionPlace}</Table.Td>
            <Table.Td>{element.date}</Table.Td>
            <Table.Td>{element.totalQuantity}</Table.Td>

            <Table.Td>{element.orderStatus}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Flex p="md" wrap="wrap" justify="space-between">
                <Greeting />
                <OrderForm
                    isDashboardButton={true}
                    opened={opened}
                    open={open}
                    close={close}
                />
            </Flex>
            <Grid grow gutter="md" justify="center" align="stretch">
                <Grid.Col className="grid-col" span={12}>
                    <Flex
                        justify="flex-start"
                        gap="md"
                        flex="1"
                        direction="column"
                    >
                        <Text>Orders</Text>
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
                            justify="center"
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
                            justify="center"
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
                            justify="center"
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
                        <Flex p="lg" justify="center">
                            <LineChart
                                h={300}
                                data={data}
                                dataKey="date"
                                series={[{ name: "Orders", color: "indigo.6" }]}
                                curveType="natural"
                                withDots={false}
                            />
                        </Flex>
                    </Flex>
                </Grid.Col>

                <Grid.Col className="grid-col" span={12}>
                    <Flex
                        justify="space-between"
                        gap="md"
                        flex="1"
                        align="center"
                        direction="row"
                    >
                        <Text>Recent Orders</Text>
                        <Button size="md">View All</Button>
                    </Flex>
                </Grid.Col>
                <Grid.Col className="grid-col" span={12}>
                    <Flex className="dashboard-box" gap="md" flex="1" p="md">
                        <Table highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th />
                                    <Table.Th>Order #</Table.Th>
                                    <Table.Th>Distribution Center</Table.Th>
                                    <Table.Th>Order Date</Table.Th>
                                    <Table.Th>Total Quantity</Table.Th>
                                    <Table.Th ta={"right"}>
                                        Order Status
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </Flex>
                </Grid.Col>
            </Grid>
            {/* main section */}
        </>
    );
}

export default Dashboard;
