import { Menu, Button, Image, rem } from "@mantine/core";
import { IconChevronDown, IconArrowsDownUp } from "@tabler/icons-react";
import Order from "./OrderClass";

interface SorterProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    whichSorters: string[];
    classes: string;
}

const Sorter: React.FC<SorterProps> = ({
    orders,
    setOrders,
    whichSorters,
    classes,
}: SorterProps) => {
    const statusRank: Map<string, number> = new Map([
        ["CANCELLED", 0],
        ["PLACED", 1],
        ["OPEN", 2],
        ["FILLED", 3],
    ]);

    const sortOrderName = () => {
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.id < b.id ? -1 : 1));
        setOrders(orderCopy);
    };

    const sortPartnerName = () => {
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.partner < b.partner ? -1 : 1));
        setOrders(orderCopy);
    };

    const sortDate = () => {
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.datePlaced < b.datePlaced ? -1 : 1));
        setOrders(orderCopy);
    };

    const sortNum = () => {
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.numDiapers < b.numDiapers ? -1 : 1));
        setOrders(orderCopy);
    };

    const statusSorter = (a: Order, b: Order) => {
        const aRank = statusRank.get(a.status);
        const bRank = statusRank.get(b.status);

        console.log(a.status + " " + aRank + " " + b.status + " " + bRank);

        if (!aRank) return -1;
        if (!bRank) return 1;

        return aRank < bRank ? -1 : 1;
    };

    const sortStatus = () => {
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort(statusSorter);
        setOrders(orderCopy);
    };

    return (
        <>
            <Menu offset={0}>
                <Menu.Target>
                    <Button
                        className="sortButton"
                        leftSection={<IconArrowsDownUp size="1rem" />}
                        rightSection={<IconChevronDown size="1rem" />}
                        size="sm"
                    >
                        Sort By
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    {whichSorters.includes("OrderName") && (
                        <Menu.Item onClick={sortOrderName}>
                            Sort by Order Name
                        </Menu.Item>
                    )}
                    {whichSorters.includes("PartnerName") && (
                        <Menu.Item onClick={sortPartnerName}>
                            Sort by Partner Name
                        </Menu.Item>
                    )}
                    {whichSorters.includes("Date") && (
                        <Menu.Item onClick={sortDate}>Sort by date</Menu.Item>
                    )}
                    {whichSorters.includes("Num") && (
                        <Menu.Item onClick={sortNum}>
                            Sort by # of diapers
                        </Menu.Item>
                    )}
                    {whichSorters.includes("Status") && (
                        <Menu.Item onClick={sortStatus}>
                            Sort by Status
                        </Menu.Item>
                    )}
                </Menu.Dropdown>
            </Menu>
        </>
    );
};

export default Sorter;
