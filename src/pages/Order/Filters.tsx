import {Menu, Button, Image, rem, Modal, MultiSelect} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import {useState} from "react"; 
import Order from './OrderClass';

interface FilterProps {
    baseOrders: Order[], 
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>,
    classes: string,

}

const Filter: React.FC<FilterProps> = ({baseOrders, setOrders, classes}: FilterProps) => {
    const [targetSizes, setTargetSizes] = useState<number[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    
    const filterMonth = () => {
        let orderCopy: Order[] = [];
        let today: Date = new Date();
        let currMonth: Number = today.getMonth();
        baseOrders.forEach((elem: Order) => {
            if (elem.datePlaced.getMonth() == currMonth) orderCopy.push(elem);
        })

        setOrders(orderCopy);
    }

    const filterQuarter = () => {
        let orderCopy: Order[] = [];
        let today: Date = new Date();
        let currQuarter: Number = today.getMonth() / 3;
        baseOrders.forEach((elem: Order) => {
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

        let orderCopy: Order[] = [];
        baseOrders.forEach((elem: Order) => {
            targetSizes.forEach((target: number) => {
                if ((elem.diaperDist[target] || 0) > 0) orderCopy.push(elem);
            }, elem)
        });

        setOrders(orderCopy);
    }

    const reset = () => {
        setOrders(baseOrders); 
    }
    
    return (
        <>
            <Menu offset={0}>
                <Menu.Target>
                    <Button className={classes} rightSection={<IconChevronDown></IconChevronDown>}>Filters</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={filterMonth}>
                        Filter by month
                    </Menu.Item>
                    <Menu.Item onClick={filterQuarter}>
                        Filter by quarter
                    </Menu.Item>
                    <Menu.Item onClick={open}>
                        Filter by sizing
                    </Menu.Item>
                    <Menu.Item onClick={reset}>
                        Remove filters
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

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
        </>
    )
}

export default Filter; 