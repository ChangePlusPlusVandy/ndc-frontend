import { Menu, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import User from "./UserClass"; 

interface SorterProps {
    users: User[], 
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
    whichSorters: string[],
    classes: string,
}

const UserSorter: React.FC<SorterProps> = ({ users, setUsers, whichSorters, classes}: SorterProps) => {
    const nameSorter = (a: User, b: User) => {
        if (a.lastName == b.lastName) return a.firstName < b.firstName ? -1 : 1;
        return a.lastName < b.lastName ? -1 : 1; 
    }
    
    const sortName = () => {
        let userCopy: User[] = users.slice(); 
        userCopy.sort(nameSorter); 
        setUsers(userCopy); 
    }

    const reverse = () => {
        let userCopy: User[] = users.slice(); 
        userCopy.reverse(); 
        setUsers(userCopy); 
    }
    
    return (
        <>
            <Menu offset={0}>
                <Menu.Target>
                    <Button className={classes} rightSection={<IconChevronDown></IconChevronDown>}>Sort By</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    {whichSorters.includes("Name") && 
                        <Menu.Item onClick={sortName}>
                            Sort by User Name
                        </Menu.Item>
                    }
                    {whichSorters.includes("Reverse") && 
                        <Menu.Item onClick={reverse}>
                            Reverse
                        </Menu.Item>
                    }
                </Menu.Dropdown>
            </Menu>

        </>
    )
}

export default UserSorter; 
