import { Group, Tabs, Modal, MultiSelect, Button, Image, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {useState} from 'react';  
import Order from './OrderClass'; 
import OrderTable from './OrderTable';
import Filter from './Filters'; 
import Sorter from './Sorters';  
import OrderForm from '../OrderForm/OrderForm'; 
import "./OrderPartner.css"; 
import ndcLogo from '../../assets/ndc-logo.png'; 

const OrderPartner: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]); 
    const [opened, { open, close }] = useDisclosure(false);
    const [targetSizes, setTargetSizes] = useState<number[]>([]); 

    const sortDate = () => {
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.datePlaced < b.datePlaced ? -1 : 1)); 
        setOrders(orderCopy); 
    }

    const sortNum = () => {
        let orderCopy: Order[] = orders.slice(); 
        orderCopy.sort((a, b) => (a.numDiapers > b.numDiapers ? -1 : 1));
        setOrders(orderCopy); 
    }

    const filterMonth = () => {
        let orderCopy: Order[] = []; 
        let today: Date = new Date(); 
        let currMonth: Number = today.getMonth(); 
        orders.forEach((elem: Order) => {
            if (elem.datePlaced.getMonth() == currMonth) orderCopy.push(elem); 
        }) 

        setOrders(orderCopy); 
    }

    const filterQuarter = () => {
        let orderCopy: Order[] = []; 
        let today: Date = new Date(); 
        let currQuarter: Number = today.getMonth() / 3; 
        orders.forEach((elem: Order) => {
            if (elem.datePlaced.getMonth() / 3 == currQuarter) orderCopy.push(elem); 
        }); 

        setOrders(orderCopy); 
    }

    const addTarget = (value: String) => {
        const valueNum = (value != "newborn") ? parseInt(value.slice(-1)) : 0;  
        
        let temp: number[] = targetSizes.slice(); 
        if (!targetSizes.includes(valueNum)) {
            temp.push(valueNum); 
            setTargetSizes(temp); 
        }
    } 

    const filterSize = () => {
        close();  

        console.log(targetSizes); 
        let orderCopy: Order[] = []; 
        orders.forEach((elem: Order) => {
            targetSizes.forEach((target: number) => {
                if ((elem.diaperDist[target] || 0) > 0) orderCopy.push(elem);
            }, elem)
        });

        setOrders(orderCopy); 
    }

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

            <Group justify='space-between' className='width-90 modButtons'>
                <Filter filterMonth={filterMonth} filterQuarter={filterQuarter} filterSize={open}></Filter>
                <Sorter sortDate={sortDate} sortNum={sortNum}></Sorter>
            </Group>

            <Modal opened={opened} onClose={close} title="Select Filter Size">
                <MultiSelect
                label="Filter sizes"
                placeholder="Pick value"
                data={['newborn', 'size 1', 'size 2', 'size 3', 'size 4', 'size 5', 'size 6']}
                clearable
                onOptionSubmit={addTarget}
                />

                <Button className='filterButton' onClick={filterSize}>Filter!</Button> 
            </Modal>
            
            <Tabs variant='unstyled' defaultValue={"open"} className="width-90">
                <Tabs.List grow>
                    <Tabs.Tab className="tableHeader tab" value="open">Open</Tabs.Tab>
                    <Tabs.Tab className="tableHeader tab" value="review">Under Review</Tabs.Tab>
                    <Tabs.Tab className="tableHeader tab" value="approved">Approved</Tabs.Tab>
                </Tabs.List>
                
                <Tabs.Panel value="open">
                    <OrderTable orders={orders} orderType={"OPEN"}></OrderTable>
                </Tabs.Panel>

                <Tabs.Panel value="review">
                    <OrderTable orders={orders} orderType={"PLACED"}></OrderTable>
                </Tabs.Panel>

                <Tabs.Panel value="approved">
                    <OrderTable orders={orders} orderType={"OPEN"}></OrderTable>
                </Tabs.Panel>
            </Tabs>

            <div className="buttonContain width-90">
                <OrderForm></OrderForm>
            </div>
                
        </main>
        
    );
};

export default OrderPartner; 

