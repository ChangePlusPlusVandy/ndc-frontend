import {
    Menu,
    Button,
    Group,
    Image,
    rem,
    Modal,
    MultiSelect,
    Flex,
    Popover,
    Text,
    Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconChevronDown,
    IconAdjustmentsHorizontal,
    IconCircleDotFilled,
    IconCircle,
    IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import Order from "./OrderClass";

interface FilterProps {
    baseOrders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    classes: string;
}

const Filter: React.FC<FilterProps> = ({
    baseOrders,
    setOrders,
    classes,
}: FilterProps) => {
    const [targetSizes, setTargetSizes] = useState<number[]>(
        Array.from(Array(7).keys())
    );

    const filterMonth = () => {
        let orderCopy: Order[] = [];
        let today: Date = new Date();
        let currMonth: Number = today.getMonth();
        baseOrders.forEach((elem: Order) => {
            if (elem.datePlaced.getMonth() == currMonth) orderCopy.push(elem);
        });

        setOrders(orderCopy);
    };

    const filterQuarter = () => {
        let orderCopy: Order[] = [];
        let today: Date = new Date();
        let currQuarter: Number = today.getMonth() / 3;
        baseOrders.forEach((elem: Order) => {
            if (elem.datePlaced.getMonth() / 3 == currQuarter)
                orderCopy.push(elem);
        });

        setOrders(orderCopy);
    };

    const changeTarget = (value: String) => {
        const valueNum = value != "newborn" ? parseInt(value.slice(-1)) : 0;

        let temp: number[] = targetSizes.slice();
        if (!targetSizes.includes(valueNum)) {
            temp.push(valueNum);
        } else {
            temp.splice(temp.indexOf(valueNum), 1);
        }
        setTargetSizes(temp);
        filterSize();
    };

    const filterSize = () => {
        let orderCopy: Order[] = [];
        baseOrders.forEach((elem: Order) => {
            let flag = false;
            targetSizes.forEach((target: number) => {
                if ((elem.diaperDist[target] || 0) != 0) {
                    flag = true;
                }
            }, elem);
            if (flag) orderCopy.push(elem);
        });
        baseOrders.forEach((elem: Order) => {
            if (!orderCopy.includes(elem)) {
                console.log(elem);
            }
        })
        setOrders(orderCopy);
    };

    const selectAll = () => {
        setTargetSizes(() => Array.from(Array(7).keys()));
        filterSize();
    };

    const reset = () => {
        setTargetSizes(() => []);
        setOrders(baseOrders);
        filterSize();
    };

    return (
        <>
            <Popover width="target" offset={1} position="bottom" shadow="md">
                <Popover.Target>
                    <Button
                        justify="space-between"
                        w={"11rem"}
                        className="filterButton"
                        leftSection={<IconAdjustmentsHorizontal size="1rem" />}
                        rightSection={<IconChevronDown size="1rem" />}
                        size="xs"
                    >
                        Filter by Sizes ({targetSizes.length})
                    </Button>
                </Popover.Target>
                <Popover.Dropdown flex={1}>
                    <Flex direction="column" gap="xs">
                        <Flex align="center" justify="space-between">
                            <Text>Sizes</Text>
                            <Badge circle color="var(--primary-color)">
                                {targetSizes.length}
                            </Badge>
                        </Flex>
                        <Group gap="xs" align="center">
                            <Button
                                className={
                                    "primary-button" +
                                    (targetSizes.length == 7
                                        ? " is-disabled"
                                        : "")
                                }
                                p="0"
                                variant="transparent"
                                size="compact-xs"
                                onClick={selectAll}
                                disabled={targetSizes.length == 7}
                            >
                                Select All
                            </Button>
                            <Text fw="bold" p="0" size="xs">
                                |
                            </Text>
                            <Button
                                className={
                                    "primary-button" +
                                    (targetSizes.length == 0
                                        ? " is-disabled"
                                        : "")
                                }
                                p="0"
                                variant="transparent"
                                size="compact-xs"
                                onClick={reset}
                                disabled={targetSizes.length == 0}
                            >
                                Reset
                            </Button>
                        </Group>
                        <Flex direction="column" gap="2">
                            <Button
                                fullWidth
                                py="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (targetSizes.includes(0)
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => changeTarget("newborn")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    Newborn
                                    <Flex flex="1" justify={"end"}>
                                        {targetSizes.includes(0) && (
                                            <IconX size="1rem" />
                                        )}
                                    </Flex>
                                </Flex>
                            </Button>
                            <Button
                                fullWidth
                                py="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (targetSizes.includes(1)
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => changeTarget("size 1")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    Size 1
                                    <Flex flex="1" justify={"end"}>
                                        {targetSizes.includes(1) && (
                                            <IconX size="1rem" />
                                        )}
                                    </Flex>
                                </Flex>
                            </Button>
                            <Button
                                fullWidth
                                py="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (targetSizes.includes(2)
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => changeTarget("size 2")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    Size 2
                                    <Flex flex="1" justify={"end"}>
                                        {targetSizes.includes(2) && (
                                            <IconX size="1rem" />
                                        )}
                                    </Flex>
                                </Flex>
                            </Button>
                            <Button
                                fullWidth
                                py="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (targetSizes.includes(3)
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => changeTarget("size 3")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    Size 3
                                    <Flex flex="1" justify={"end"}>
                                        {targetSizes.includes(3) && (
                                            <IconX size="1rem" />
                                        )}
                                    </Flex>
                                </Flex>
                            </Button>
                            <Button
                                fullWidth
                                py="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (targetSizes.includes(4)
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => changeTarget("size 4")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    Size 4
                                    <Flex flex="1" justify={"end"}>
                                        {targetSizes.includes(4) && (
                                            <IconX size="1rem" />
                                        )}
                                    </Flex>
                                </Flex>
                            </Button>
                            <Button
                                fullWidth
                                py="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (targetSizes.includes(5)
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => changeTarget("size 5")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    Size 5
                                    <Flex flex="1" justify={"end"}>
                                        {targetSizes.includes(5) && (
                                            <IconX size="1rem" />
                                        )}
                                    </Flex>
                                </Flex>
                            </Button>
                            <Button
                                fullWidth
                                py="0"
                                justify="stretch"
                                display="block"
                                className={
                                    "stretch-button filter-item" +
                                    (targetSizes.includes(6)
                                        ? " primary-button filters-item-selected"
                                        : "")
                                }
                                variant="transparent"
                                ta="start"
                                onClick={() => changeTarget("size 6")}
                            >
                                <Flex
                                    flex="1"
                                    gap="sm"
                                    align="center"
                                    justify={"stretch"}
                                >
                                    Size 6
                                    <Flex flex="1" justify={"end"}>
                                        {targetSizes.includes(6) && (
                                            <IconX size="1rem" />
                                        )}
                                    </Flex>
                                </Flex>
                            </Button>
                        </Flex>
                    </Flex>
                </Popover.Dropdown>
            </Popover>
        </>
    );
};

export default Filter;
