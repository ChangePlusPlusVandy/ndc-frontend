import {Menu, Button, Image, rem} from '@mantine/core';
import downArrow from '../../assets/downArrow.jpg'; 

const Sorter: React.FC = () => {
    return (
        <Menu offset={0}>
            <Menu.Target>
                <Button className='whiteButton' rightSection={<Image w={rem(20)} src={downArrow}/>}>Sort By</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item>
                    Sort by date 
                </Menu.Item>
                <Menu.Item>
                    Sort by # of diapers
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default Sorter; 