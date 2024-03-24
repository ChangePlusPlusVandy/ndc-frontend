import React, { useEffect, useState } from "react";
import Order from "./OrderClass";
import "../../styles/OrderTracking.css";
import OrderPopup from "../OrderPopup";
import { IconCircle, IconPencil } from "@tabler/icons-react";
import {
    Container,
    Flex,
    Group,
    Stack,
    Text,
    Table,
    Checkbox,
    ActionIcon,
    Badge,
} from "@mantine/core";

interface TableProps {
    orders: Order[];
    orderType: string;
}

const OrderTable: React.FC<TableProps> = ({
    orders,
    orderType,
}: TableProps) => {
    /*orders?.map((val: Order, index: number) => (
        <div key={index}>
            <Container
                className="single-order"
                w="100%"
                fluid
                key={index}
            >
                <OrderPopup order={val}>
                    <Group style={{ width: "100%" }} grow gap="xl">
                        <Text>#{index}</Text>
                        <Text>{val.datePlaced.toDateString()}</Text>
                        <Text>{val.numDiapers}</Text>
                        <Text>{val.status}</Text>
                    </Group>
                </OrderPopup>
            </Container>
        </div>
    ))}*/
    const rows = orders?.map((val: Order, index: number) => (
        <Table.Tr key={index}>
            <Table.Td>
                <OrderPopup order={val}>
                    <ActionIcon
                        variant="filled"
                        color="var(--primary-color)"
                        radius="xl"
                        aria-label="Edit Order"
                    >
                        <IconPencil
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </OrderPopup>
            </Table.Td>
            <Table.Td ta="center">{index}</Table.Td>
            {/*<Table.Td ta="center">{element.distributionPlace}</Table.Td>*/}
            <Table.Td ta="center">{val.datePlaced.toDateString()}</Table.Td>
            <Table.Td ta="end">{val.numDiapers}</Table.Td>
            <Table.Td>
                <Flex justify="center" gap="md" align={"center"}>
                    <Flex bg="blue" justify="center" gap="md" align="center" p="xs">
                        <IconCircle
                            className={
                                val.status == "Unreviewed"
                                    ? "unreviewed-icon"
                                    : val.status == "Open"
                                    ? "open-icon"
                                    : "approved-icon"
                            }
                            size=".75rem"
                        />
                        <Text>{val.status}</Text>
                    </Flex>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th />
                        <Table.Th ta="center">Order #</Table.Th>
                        {/*<Table.Th ta="center">Distribution Center</Table.Th>*/}
                        <Table.Th ta="center">Order Date</Table.Th>
                        <Table.Th ta="end">Total Quantity</Table.Th>
                        <Table.Th className="table-order-status" ta={"center"}>
                            Order Status
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
};

export default OrderTable;
