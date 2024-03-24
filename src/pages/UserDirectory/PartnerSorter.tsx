import { Menu, Button, Image, rem } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import Partner from './PartnerClass';

interface SorterProps {
    partners: Partner[], 
    setPartners: React.Dispatch<React.SetStateAction<Partner[]>>
    whichSorters: string[],
    classes: string,
}

const PartnerSorter: React.FC<SorterProps> = ({ partners, setPartners, whichSorters, classes}: SorterProps) => {
    const nameSorter = (a: Partner, b: Partner) => {
        if (a.lastName == b.lastName) return a.firstName < b.firstName ? -1 : 1;
        return a.lastName < b.lastName ? -1 : 1; 
    }
    
    const sortName = () => {
        let partnerCopy: Partner[] = partners.slice(); 
        partnerCopy.sort(nameSorter); 
        setPartners(partnerCopy); 
    }

    const reverse = () => {
        let partnerCopy: Partner[] = partners.slice(); 
        partnerCopy.reverse(); 
        setPartners(partnerCopy); 
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
                            Sort by Order Name
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

export default PartnerSorter; 
