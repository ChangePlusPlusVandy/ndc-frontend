import React from 'react';
import OrderPopup from '../OrderPopup';
import { Container, Group, Stack, Text, Flex } from '@mantine/core';
import Order from '../OrderTracking/OrderClass'; 
import StatusImage from './StatusImage';


interface TableProps {
    orders: Order[]
}

const StaffOrderTable: React.FC<TableProps> = ({ orders }: TableProps) => {
    return (
        <div>
            <div>
                <Stack gap="xs">
                    <Container w="100%" fluid mt="7" className='staff-header'>
                        <Group style={{ width: '100%' }} grow gap="xl">
                            <Text fw={700}>Partner Name</Text>
                            <Text fw={700}>Order Date</Text>
                            <Text fw={700}>Total Quantity</Text>
                            <Text fw={700}>Order Status</Text>
                        </Group>
                    </Container>
                    {orders?.map((val: Order, index: number) => {
                        return (
                            <Container className="OrderPopup-container" w="100%" fluid key={index}>
                                <OrderPopup order={val}>
                                    <Group style={{ width: '100%' }} grow gap="xl">
                                        <Text>{val.partner}</Text>
                                        <Text>{val.datePlaced.toDateString()}</Text>
                                        <Text>{val.numDiapers}</Text>
                                        <Flex direction="row" gap="sm" align={"center"}>
                                            <StatusImage status={val.status}></StatusImage>
                                            <Text>{val.status}</Text>
                                        </Flex>
                                            
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

export default StaffOrderTable; 
