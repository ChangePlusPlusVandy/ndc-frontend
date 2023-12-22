import { Group, Tabs, Button, Image, rem } from '@mantine/core';
import OrderTable from './OrderTable'; 
import "./OrderPartner.css"; 
import ndcLogo from '../../assets/ndc-logo.png'; 

const OrderPartner: React.FC = () => {
    return (
        <main>
            <header>
                <Group justify="space-between" className="width-90">
                    <Button leftSection={<Image w={rem(64)} src={ndcLogo} />} variant='white' color='black'>
                        Nashville D.C.
                    </Button>
                    <div className='orderTitle'>Orders</div>
                    <Button leftSection={"[photo]"} variant='white' color='black'> 
                        My Profile
                    </Button>
                </Group>
                
            </header>
            
            <Tabs variant='unstyled' defaultValue={"open"} className="width-90">
                <Tabs.List grow className=''>
                    <Tabs.Tab className="tableHeader tab" value="open">Open</Tabs.Tab>
                    <Tabs.Tab className="tableHeader tab" value="review">Under Review</Tabs.Tab>
                    <Tabs.Tab className="tableHeader tab" value="approved">Approved</Tabs.Tab>
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
            <div className="buttonContain width-90">
                <Button variant='filled' color='rgba(92, 92, 92, 1)'>Make an Order</Button>
            </div>
                
        </main>
        
    );
};

export default OrderPartner; 

