import {Menu, Button, Image, rem} from '@mantine/core';
import downArrow from '../../assets/downArrow.jpg'; 

const Filter: React.FC = () => {
    return (
        <Menu offset={0}>
            <Menu.Target>
                <Button className='whiteButton' rightSection={<Image w={rem(20)} src={downArrow}/>}>Filters</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item>
                    Filter by month
                </Menu.Item>
                <Menu.Item>
                    Filter by quarter
                </Menu.Item>
                <Menu.Item>
                    Filter by sizing
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default Filter; 