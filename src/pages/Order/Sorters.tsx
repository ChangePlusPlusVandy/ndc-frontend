import { Menu, Button, Image, rem } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { MouseEventHandler } from 'react';

interface SorterProps {
    sortDate: MouseEventHandler,
    sortNum: MouseEventHandler
}
<div className="page-container">
    <h1>Page Title</h1>
    <div className="page-header">
        <h1>Header title</h1>
        <h3>Sub-title</h3>
        <img id="logo"></img>
    </div>
</div>


const Sorter: React.FC<SorterProps> = ({ sortDate, sortNum }: SorterProps) => {
    return (
        <>
            <Menu offset={0}>
                <Menu.Target>
                    <Button className='whiteButton' rightSection={<IconChevronDown></IconChevronDown>}>Sort By</Button>
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

        </>
    )
}

export default Sorter; 
