import React, { useState, useEffect } from "react";
import { rem, Container, Text, Title, Flex, Grid, Table } from "@mantine/core";
import { DonutChart, BarChart } from "@mantine/charts";

import "../../styles/StaffDashboard.css";
import { IconCircleFilled, IconCircle } from "@tabler/icons-react";

const StaffDashboard: React.FC = () => {
    useEffect(() => {}, []);

    const fakeDonutChart = [
        { name: "Unreviewed", value: 400, color: "#ead3e4" },
        { name: "Open", value: 300, color: "#653661" },
        { name: "Approved", value: 300, color: "#c99bc3" },
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
        { month: "Jan.", Maybe: 1200 },
        { month: "Feb.", Maybe: 1900 },
        { month: "Mar.", Maybe: 400 },
        { month: "Apr.", Maybe: 1000 },
        { month: "May", Maybe: 800 },
        { month: "Jun.", Maybe: 750 },
        { month: "Jul.", Maybe: 500 },
        { month: "Aug.", Maybe: 300 },
        { month: "Sep.", Maybe: 750 },
        { month: "Oct.", Maybe: 400 },
        { month: "Nov.", Maybe: 750 },
        { month: "Dec.", Maybe: 750 },
    ];

    return (
        <>
            <Title ta={{ base: "center", sm: "left" }} p="md">
                Hello, Staff Name
            </Title>
            <Grid grow gutter="md" justify="center" align="stretch">
                <Grid.Col
                    className="grid-col"
                    span={{ base: 12, sm: 6, md: 5 }}
                >
                    <Flex
                        justify="space-between"
                        flex="1"
                        className="dashboard-box"
                        p="md"
                        direction="column"
                    >
                        <Text>Orders</Text>
                        <Flex p="lg" justify="center">
                            <DonutChart
                                
                                data={fakeDonutChart}
                                withLabelsLine={false}
                                withLabels
                                tooltipDataSource="segment"
                            />
                        </Flex>
                        <Flex
                            direction={{ base: "column", xs: "row" }}
                            justify={{ base: "center", xs: "space-evenly" }}
                        >
                            <Flex justify="center" gap="md" align={"center"}>
                                <IconCircle
                                    className="unreviewed-icon"
                                    size=".75rem"
                                />
                                <Text>Unreviewed</Text>
                            </Flex>
                            <Flex justify="center" gap="md" align={"center"}>
                                <IconCircle
                                    className="open-icon"
                                    size=".75rem"
                                />
                                <Text>Open</Text>
                            </Flex>
                            <Flex justify="center" gap="md" align={"center"}>
                                <IconCircle
                                    className="approved-icon"
                                    size=".75rem"
                                />
                                <Text>Approved</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col className="grid-col" span={{ base: 12, sm: 2 }}>
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
                            direction="column"
                            className="dashboard-box"
                        >
                            <Text>Open</Text>
                            <Title>100</Title>
                        </Flex>
                        <Flex
                            flex="1"
                            justify="center"
                            ta="center"
                            p="md"
                            direction="column"
                            className="dashboard-box"
                        >
                            <Text>Unreviewed</Text>
                            <Title>50</Title>
                        </Flex>
                        <Flex
                            flex="1"
                            justify="center"
                            ta="center"
                            p="md"
                            direction="column"
                            className="dashboard-box"
                        >
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
                        justify="flex-start"
                        gap="md"
                        flex="1"
                        className="dashboard-box"
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
                        className="dashboard-box"
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
                                { name: "Yes", color: "#804d7a" },
                                { name: "No", color: "#eedee7" },
                            ]}
                        />
                    </Flex>
                </Grid.Col>
                <Grid.Col className="grid-col" span={{ base: 12, sm: 6 }}>
                    <Flex
                        p="md"
                        gap="md"
                        className="dashboard-box"
                        flex="1"
                        direction="column"
                    >
                        <Text>Monthly Deliveries</Text>
                        <BarChart
                            h={250}
                            data={fakeBarChartHorizontal}
                            dataKey="month"
                            series={[{ name: "Maybe", color: "#804d7a" }]}
                            tickLine="y"
                        />
                    </Flex>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default StaffDashboard;
