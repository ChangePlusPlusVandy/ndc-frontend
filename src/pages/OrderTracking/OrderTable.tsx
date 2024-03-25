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
    Pagination,
} from "@mantine/core";

interface TableProps {
    orders: Order[];
    orderType: string;
    amount: number;
    showPagination: boolean;
}

const OrderTable: React.FC<TableProps> = ({
    orders,
    orderType,
    amount,
    showPagination,
}: TableProps) => {
    const [activePage, setActivePage] = useState(1);

    const standardCase = (s: string) => {
        return s[0]?.toUpperCase() + s.substring(1).toLowerCase();
    };
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(minIndex + amount - 1);
    let total = 0;
    let orderCut: Order[] = [];

    orders.forEach((elem: Order) => {
        if (orderType == "" || elem.status == orderType) {
            if (total <= maxIndex && total >= minIndex) {
                
                orderCut.push(elem);
            }
            total++;
        }
    });

    const handlePageChange = (val: number) => {
        setMinIndex((val - 1) * amount);
        setMaxIndex((val - 1) * amount + amount - 1);
        setActivePage(val);
    };

    const rows = orderCut?.map((val: Order, index: number) => (
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
                <Flex justify="center" gap="sm" align={"center"}>
                    <Flex
                        className={"status-badge " + val.status.toLowerCase()}
                        px="lg"
                        justify="center"
                        gap="md"
                        align="center"
                        p="xs"
                    >
                        <IconCircle
                            className={val.status.toLowerCase() + "-dot"}
                            size=".75rem"
                        />
                        {standardCase(val.status)}
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
            {showPagination && (
                <Flex flex="1" p="md" justify="center">
                    <Pagination
                        total={Math.ceil(total / amount)}
                        value={activePage}
                        onChange={handlePageChange}
                        classNames={{ control: "orderPagination" }}
                    />
                </Flex>
            )}
        </>
    );
};

export default OrderTable;
