import {Menu, Button, Image, rem} from '@mantine/core';
import downArrow from '../../assets/downArrow.jpg'; 
import { MouseEventHandler } from 'react';

interface SorterProps {
    sortDate: MouseEventHandler, 
    sortNum: MouseEventHandler
}

const Sorter: React.FC<SorterProps> = ({sortDate, sortNum}: SorterProps) => {
    return (
        <Menu offset={0}>
            <Menu.Target>
                <Button className='whiteButton' rightSection={<Image w={rem(20)} src={downArrow}/>}>Sort By</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={sortDate}>
                    Sort by date 
                </Menu.Item>
                <Menu.Item onClick={sortNum}>
                    Sort by # of diapers
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default Sorter; 