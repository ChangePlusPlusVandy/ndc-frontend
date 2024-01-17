import {Menu, Button, Image, rem} from '@mantine/core';
import downArrow from '../../assets/downArrow.png'; 

const Sorter: React.FC = () => {
    return (
        <Menu>
            <Menu.Target>
                <Button rightSection={<Image w={rem(64)} src={downArrow}/>}>Sort By</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item>
                    Sort by date 
                </Menu.Item>
                <Menu.Item>
                    Sort by number of diapers requested
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default Sorter; 