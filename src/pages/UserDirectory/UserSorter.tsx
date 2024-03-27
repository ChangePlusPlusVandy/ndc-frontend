import { useState } from "react"; 
import { Menu, Button, Group } from '@mantine/core';
import { IconChevronDown, IconArrowsDownUp } from '@tabler/icons-react';
import User from "./UserClass"; 

interface SorterProps {
    users: User[], 
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
    whichSorters: string[],
    wrapperClasses: string, 
    classes: string,
}

const UserSorter: React.FC<SorterProps> = ({ users, setUsers, whichSorters, wrapperClasses, classes}: SorterProps) => {
    const [targetText, setTargetText] = useState("Sort By"); 
    
    const nameSorter = (a: User, b: User) => {
        if (a.lastName == b.lastName) return a.firstName < b.firstName ? -1 : 1;
        return a.lastName < b.lastName ? -1 : 1; 
    }
    
    const sortName = () => {
        let userCopy: User[] = users.slice(); 
        userCopy.sort(nameSorter); 
        setUsers(userCopy); 
        setTargetText("Last Name A-Z"); 
    }

    const reverse = () => {
        let userCopy: User[] = users.slice(); 
        userCopy.reverse(); 
        setUsers(userCopy); 
        setTargetText("Last Name " + (targetText === "Last Name A-Z" ? "Z-A" : "A-Z"))
    }
    
    return (
        <Group gap={"xs"} className={wrapperClasses}>
            <Button variant="subtle" onClick={reverse} className="button-transparent" size="compact-xs">
                <IconArrowsDownUp height={"1rem"} width={"1rem"}></IconArrowsDownUp>
            </Button>
            <Menu offset={0}>
                <Menu.Target>
                    <Button 
                        className={classes} 
                        rightSection={<IconChevronDown></IconChevronDown>}>
                        {targetText}
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    {whichSorters.includes("Name") && 
                        <Menu.Item onClick={sortName}>
                            Last Name A-Z
                        </Menu.Item>
                    }
                </Menu.Dropdown>
            </Menu>

        </Group>
    )
}

export default UserSorter; 
