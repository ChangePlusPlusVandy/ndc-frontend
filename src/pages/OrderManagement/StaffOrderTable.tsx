import React from 'react';
import OrderPopup from '../OrderPopup';
import { Container, Group, Stack, Text, Flex } from '@mantine/core';
import Order from '../Order/OrderClass'; 
import StatusImage from './StatusImage';


interface TableProps {
    orders: Order[]
}

const StaffOrderTable: React.FC<TableProps> = ({ orders }: TableProps) => {
    return (
        <div>
            <div>
                <Stack gap="xs">
                    <Container w="100%" fluid mt="7">
                        <Group style={{ width: '100%' }} grow gap="xl">
                            <Text>Order #</Text>
                            {/* <Text>Partner Name</Text> */}
                            <Text>Order Date</Text>
                            <Text>Total Quantity</Text>
                            <Text>Order Status</Text>
                        </Group>
                    </Container>
                    {orders?.map((val: Order, index: number) => {
                        return (
                            <Container className="" w="100%" fluid key={index}>
                                <OrderPopup order={val}>
                                    <Group style={{ width: '100%' }} grow gap="xl">
                                        {/* <Button>#{index}</Button> */}
                                        <Text>#{val.id}</Text>
                                        {/* <Text>{val.partnerName}</Text> */}
                                        <Text>{val.datePlaced.toDateString()}</Text>
                                        <Text>{val.numDiapers}</Text>
                                        <Flex direction="row" gap="sm">
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
