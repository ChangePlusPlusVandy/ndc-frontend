import React, { useEffect, useState } from 'react';
import Order from './OrderClass';
import "./OrderPartner.css";
import OrderPopup from '../OrderPopup';
import { Container, Flex, Group, Stack, Text } from '@mantine/core';


interface TableProps {
    orders: Order[],
    orderType: string,
}

const OrderTable: React.FC<TableProps> = ({ orders, orderType }: TableProps) => {
    return (
        <div>
            <div>
                <Stack gap="xs">
                    <Container w="100%" fluid mt="7">
                        <Group style={{ width: '100%' }} grow gap="xl">
                            <Text>Number</Text>
                            <Text>Date Placed</Text>
                            <Text># of Diapers</Text>
                            <Text>Status</Text>
                        </Group>
                    </Container>
                    {orders?.map((val: Order, index: number) => {
                        return (
                            <Container className="single-order" w="100%" fluid key={index}>
                                <OrderPopup>
                                    <Group style={{ width: '100%' }} grow gap="xl">
                                        <Text>#{index}</Text>
                                        <Text>{val.datePlaced.toDateString()}</Text>
                                        <Text>{val.numDiapers}</Text>
                                        <Text>{val.status}</Text>
                                    </Group>
                                </OrderPopup>
                            </Container>
                        )
                    })}
                </Stack>
            </div>

        </div>
    );
}

export default OrderTable; 
