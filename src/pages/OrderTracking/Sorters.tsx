import { useState } from "react";
import {
    Menu,
    Button,
    Image,
    rem,
    Popover,
    Text,
    Radio,
    ComboboxItem,
    Flex,
    Group,
} from "@mantine/core";
import {
    IconChevronDown,
    IconArrowsDownUp,
    IconCircleDotFilled,
    IconCircle,
} from "@tabler/icons-react";
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
    const [value, setValue] = useState<string | undefined>("Newest - Oldest");

    const statusRank: Map<string, number> = new Map([
        ["CANCELLED", 0],
        ["PLACED", 1],
        ["OPEN", 2],
        ["FILLED", 3],
    ]);

    const sortOrderName = () => {
        setValue("OrderName");
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.id < b.id ? -1 : 1));
        setOrders(orderCopy);
    };

    const sortPartnerName = () => {
        setValue("PartnerName");
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.partner < b.partner ? -1 : 1));
        setOrders(orderCopy);
    };

    const sortDateAscending = () => {
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.datePlaced < b.datePlaced ? -1 : 1));
        setOrders(orderCopy);
    };

    const sortDateDescending = () => {
        let orderCopy: Order[] = orders.slice();
        orderCopy.sort((a, b) => (a.datePlaced > b.datePlaced ? -1 : 1));
        setOrders(orderCopy);
    };

    const handleChange = (e: string | undefined) => {
        setValue(e);
        if (e == "Newest - Oldest") {
            sortDateDescending();
        } else if (e == "Oldest - Newest") {
            sortDateAscending();
        }
    };

    const sortNum = () => {
        setValue("Num");
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
            <Popover width="target" offset={1} position="bottom" shadow="md">
                <Popover.Target>
                    <Button
                        justify="space-between"
                        size="xs"
                        w="11rem"
                        className="sortButton"
                        leftSection={<IconArrowsDownUp size="1rem" />}
                        rightSection={<IconChevronDown size="1rem" />}
                    >
                        {value}
                    </Button>
                </Popover.Target>
                <Popover.Dropdown flex={1}>
                    <Flex direction="column" gap="sm">
                        <Text>Sorting</Text>
                        <Flex direction="column" gap="2">
                            <Button
                                fullWidth
                                p="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (value == "Newest - Oldest"
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => handleChange("Newest - Oldest")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    {value == "Newest - Oldest" ? (
                                        <IconCircleDotFilled size="1rem" />
                                    ) : (
                                        <IconCircle size="1rem" />
                                    )}
                                    Newest - Oldest
                                </Flex>
                            </Button>
                            <Button
                                fullWidth
                                p="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (value == "Oldest - Newest"
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => handleChange("Oldest - Newest")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    {value == "Oldest - Newest" ? (
                                        <IconCircleDotFilled size="1rem" />
                                    ) : (
                                        <IconCircle size="1rem" />
                                    )}
                                    Oldest - Newest
                                </Flex>
                            </Button>
                        </Flex>
                    </Flex>
                </Popover.Dropdown>
            </Popover>
        </>
    );
};

export default Sorter;
