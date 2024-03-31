import React from "react";
import { Title, Text, Container, Group, Flex, Divider } from "@mantine/core";

type ConfirmationProps = {
    date: Date | null;
    numDiapers: any;
    distributionPlace: string | number;
    sizes: any;
};

const OrderFormConfirmation: React.FC<ConfirmationProps> = ({
    date,
    numDiapers,
    distributionPlace,
    sizes,
}: ConfirmationProps) => {
    return (
        <>
            <Flex
                gap="xs"
                bg="white"
                align={"stretch"}
                direction={"column"}
                px="xl"
            >
                <Title ta="center">
                    Order Confirmed!
                </Title>
                <Group align="stretch" gap="lg" justify="space-around" flex="1">
                    <Flex direction={"column"}>
                        <Text>Date</Text>
                        <Text>{date?.toDateString()}</Text>
                    </Flex>
                    <Flex direction={"column"}>
                        <Text>Distribution Center</Text>
                        <Text>{distributionPlace}</Text>
                    </Flex>
                    <Flex direction={"column"}>
                        <Text>Name</Text>
                        <Text>Partner Name</Text>
                    </Flex>
                </Group>
                <Divider />
                <Text className="mantine-Subtitle-root">Details</Text>

                <Flex direction="column" gap="md">
                    <Group px="lg" justify="space-between">
                        <Text>Newborn</Text>
                        <Text>{sizes.newborn}</Text>
                    </Group>
                    <Group px="lg" justify="space-between">
                        <Text>Size 1</Text>
                        <Text>{sizes.size1}</Text>
                    </Group>
                    <Group px="lg" justify="space-between">
                        <Text>Size 2</Text>
                        <Text>{sizes.size2}</Text>
                    </Group>
                    <Group px="lg" justify="space-between">
                        <Text>Size 3</Text>
                        <Text>{sizes.size3}</Text>
                    </Group>
                    <Group px="lg" justify="space-between">
                        <Text>Size 4</Text>
                        <Text>{sizes.size4}</Text>
                    </Group>
                    <Group px="lg" justify="space-between">
                        <Text>Size 5</Text>
                        <Text>{sizes.size5}</Text>
                    </Group>
                    <Group px="lg" justify="space-between">
                        <Text>Size 6</Text>
                        <Text>{sizes.size6}</Text>
                    </Group>
                </Flex>
                <Divider />
                <Group px="lg" justify="space-between">
                    <Text>Total</Text>
                    <Text>{numDiapers}</Text>
                </Group>
            </Flex>
        </>
    );
};

export default OrderFormConfirmation;
