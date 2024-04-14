import React, { useEffect, useState } from "react";
import Order from "./OrderClass";
import "../../styles/OrderTracking.css";
import {
    Flex,
    Text,
    Table,
    Pagination,
} from "@mantine/core";
import OrderSubtable from "./OrderSubtable";

interface TableProps {
    orders: Order[];
    orderTypes: string[];
    amount: number;
    showPagination: boolean;
}

const OrderTable: React.FC<TableProps> = ({
    orders,
    orderTypes,
    amount,
    showPagination,
}: TableProps) => {
    const [activePage, setActivePage] = useState(1);

    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(minIndex + amount - 1);
    let total = 0;
    let orderCut: Order[] = [];

    orders.forEach((elem: Order) => {
        if (orderTypes && orderTypes.includes(elem.status)) {
            if (total <= maxIndex && total >= minIndex) {
                orderCut.push(elem);
            }
            total++;
        }
    });

    const handlePageChange = (val: number) => {
        const calculatedMin = (val - 1) * amount;
        const calculatedMax = (val - 1) * amount + amount - 1;
        if (calculatedMin < 0) {
            setMinIndex(0);
            setActivePage(1);
        } else {
            setMinIndex(calculatedMin);
            setActivePage(val);
        }
        if (calculatedMax > total - 1) {
            setMaxIndex(total - 1);
            setActivePage(Math.ceil(total / amount));
        } else {
            setMaxIndex((val - 1) * amount + amount - 1);
            setActivePage(val);
        }
    };

    const rows = orderCut?.map((val: Order, index: number) => (
        <OrderSubtable order={val} index={index}></OrderSubtable>
    ));
    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th />
                        <Table.Th ta="center">Order #</Table.Th>
                        <Table.Th ta="center">Distribution Center</Table.Th>
                        <Table.Th ta="center">Order Date</Table.Th>
                        <Table.Th ta="end">Total Quantity</Table.Th>
                        <Table.Th className="table-order-status" ta={"center"}>
                            Order Status
                        </Table.Th>
                        <Table.Th ta="center">Delivered?</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={6}>
                                <Text py="lg" ta={"center"}>
                                    No orders found.
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
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
