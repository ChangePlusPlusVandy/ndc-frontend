import {Menu, Button, Image, rem} from '@mantine/core';
import downArrow from '../../assets/downArrow.jpg'; 
import { MouseEventHandler } from 'react';

interface FilterProps {
    filterMonth: MouseEventHandler, 
    filterQuarter: MouseEventHandler, 
    filterSize: MouseEventHandler,
}

const Filter: React.FC<FilterProps> = ({filterMonth, filterQuarter, filterSize}: FilterProps) => {
    return (
        <Menu offset={0}>
            <Menu.Target>
                <Button className='whiteButton' rightSection={<Image w={rem(20)} src={downArrow}/>}>Filters</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={filterMonth}>
                    Filter by month
                </Menu.Item>
                <Menu.Item onClick={filterQuarter}>
                    Filter by quarter
                </Menu.Item>
                <Menu.Item onClick={filterSize}>
                    Filter by sizing
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default Filter; 