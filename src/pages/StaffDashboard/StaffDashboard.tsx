import React, { useState, useEffect } from "react";
import { rem, Container, Text, Title, Flex, Grid, Table } from "@mantine/core";
import { DonutChart, BarChart } from "@mantine/charts";

import "../../styles/StaffDashboard.css";
import { IconCircleFilled } from "@tabler/icons-react";

const StaffDashboard: React.FC = () => {
    useEffect(() => {}, []);

    const fakeDonutChart = [
        { name: "Unreviewed", value: 400, color: "blue" },
        { name: "Open", value: 300, color: "red" },
        { name: "Approved", value: 300, color: "green" },
    ];

    const fakeTable = [
        { orderNumber: 2309840293840, date: "01/01/24" },
        { orderNumber: 2309840293841, date: "01/02/24" },
        { orderNumber: 2309840293842, date: "01/03/24" },
        { orderNumber: 2309840293843, date: "01/04/24" },
        { orderNumber: 2309840293844, date: "01/05/24" },
    ];

    const rows = fakeTable.map((element) => (
        <Table.Tr key={element.orderNumber}>
            <Table.Td>{element.orderNumber}</Table.Td>
            <Table.Td ta="right">{element.date}</Table.Td>
        </Table.Tr>
    ));

    const fakeBarChartVertical = [
        { month: "0", Yes: 1200, No: 200 },
        { month: "1", Yes: 700, No: 500 },
        { month: "2", Yes: 400, No: 1000 },
        { month: "3", Yes: 1000, No: 200 },
        { month: "4", Yes: 800, No: 1400 },
        { month: "5", Yes: 750, No: 600 },
    ];

    const fakeBarChartHorizontal = [
        { month: "January", Maybe: 1200 },
        { month: "February", Maybe: 1900 },
        { month: "March", Maybe: 400 },
        { month: "April", Maybe: 1000 },
        { month: "May", Maybe: 800 },
        { month: "June", Maybe: 750 },
        { month: "July", Maybe: 500 },
        { month: "August", Maybe: 300 },
        { month: "September", Maybe: 750 },
        { month: "October", Maybe: 400 },
        { month: "November", Maybe: 750 },
        { month: "December", Maybe: 750 },
    ];

    return (
        <>
            <Title p="md">Hello, Staff Name</Title>
            <Grid grow gutter="md" justify="center" align="stretch">
                <Grid.Col
                    className="grid-col"
                    span={{ base: 12, sm: 6, md: 5 }}
                >
                    <Flex
                        justify="space-between"
                        flex="1"
                        bg="white"
                        p="md"
                        direction="column"
                    >
                        <Text>Orders</Text>
                        <Flex p="lg" justify="center">
                            <DonutChart
                                withTooltip={false}
                                data={fakeDonutChart}
                            />
                        </Flex>
                        <Flex
                            direction={{ base: "column", xs: "row" }}
                            justify={{ base: "center", xs: "space-evenly" }}
                        >
                            <Flex justify="center" gap="md" align={"center"}>
                                <IconCircleFilled color="red" size=".75rem" />
                                <Text>Unreviewed</Text>
                            </Flex>
                            <Flex justify="center" gap="md" align={"center"}>
                                <IconCircleFilled color="blue" size=".75rem" />
                                <Text>Open</Text>
                            </Flex>
                            <Flex justify="center" gap="md" align={"center"}>
                                <IconCircleFilled color="green" size=".75rem" />
                                <Text>Approved</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col className="grid-col" span={{ base: 12, sm: 2 }}>
                    <Flex
                        justify="space-between"
                        gap="md"
                        p="0"
                        flex="1"
                        direction="column"
                        align="stretch"
                    >
                        <Flex ta="center" p="md" direction="column" bg="white">
                            <Text>Open</Text>
                            <Title>100</Title>
                        </Flex>
                        <Flex ta="center" p="md" direction="column" bg="white">
                            <Text>Unreviewed</Text>
                            <Title>50</Title>
                        </Flex>
                        <Flex ta="center" p="md" direction="column" bg="white">
                            <Text>Approved</Text>
                            <Title>25</Title>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col
                    className="grid-col"
                    span={{ base: 12, sm: 4, md: 5 }}
                >
                    <Flex
                        justify="space-between"
                        flex="1"
                        bg="white"
                        p="md"
                        direction="column"
                    >
                        <Text>Order Requests</Text>
                        <Table highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Order #</Table.Th>
                                    <Table.Th ta={"right"}>Date</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </Flex>
                </Grid.Col>
                <Grid.Col className="grid-col" span={{ base: 12, sm: 6 }}>
                    <Flex
                        bg="white"
                        gap="md"
                        flex="1"
                        p="md"
                        direction="column"
                    >
                        <Text>Inventory by Size</Text>
                        <BarChart
                            h={250}
                            data={fakeBarChartVertical}
                            dataKey="month"
                            type="stacked"
                            orientation="vertical"
                            series={[
                                { name: "Yes", color: "violet.6" },
                                { name: "No", color: "blue.6" },
                                { name: "Tablets", color: "teal.6" },
                            ]}
                        />
                    </Flex>
                </Grid.Col>
                <Grid.Col className="grid-col" span={{ base: 12, sm: 6 }}>
                    <Flex
                        p="md"
                        gap="md"
                        bg="white"
                        flex="1"
                        direction="column"
                    >
                        <Text>Monthly Deliveries</Text>
                        <BarChart
                            h={250}
                            data={fakeBarChartHorizontal}
                            dataKey="month"
                            series={[{ name: "Maybe", color: "violet.6" }]}
                            tickLine="y"
                        />
                    </Flex>
                </Grid.Col>
            </Grid>
            <Flex direction="column" justify="space-between" align="stretch">
                <Flex gap="md" justify="space-between" align="stretch"></Flex>
            </Flex>
        </>
    );
};

export default StaffDashboard;
