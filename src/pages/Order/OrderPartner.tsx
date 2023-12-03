import { Tabs } from '@mantine/core';
import OrderTable from './OrderTable';  

const OrderPartner: React.FC = () => {
    return (
        <div>
            <Tabs color='rgba(0, 0, 0, 1)' defaultValue={"open"}>
                <Tabs.List>
                    <Tabs.Tab value="open">Open</Tabs.Tab>
                    <Tabs.Tab value="review">Under Review</Tabs.Tab>
                    <Tabs.Tab value="approved">Approved</Tabs.Tab>
                </Tabs.List>
                
                <Tabs.Panel value="open">
                    <OrderTable orderType={"OPEN"}></OrderTable>
                </Tabs.Panel>

                <Tabs.Panel value="review">
                    <OrderTable orderType={"PLACED"}></OrderTable>
                </Tabs.Panel>

                <Tabs.Panel value="approved">
                    <OrderTable orderType={"OPEN"}></OrderTable>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default OrderPartner; 

