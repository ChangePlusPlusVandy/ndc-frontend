import React, { useState, useEffect } from "react";
import { Title, Text, Container, Flex, Group, Divider } from "@mantine/core";
import "../../styles/orderForm.css";

type ReviewProps = {
    sizes: any;
    deliveryInfo: any;
    numDiapers: number;
};

const OrderFormReview: React.FC<ReviewProps> = ({
    sizes,
    deliveryInfo,
    numDiapers,
}: ReviewProps) => {
    return (
        <>
            <Container bg="white">
                <Text ta="center">
                    Review the information below to ensure everything is
                    correct.
                </Text>
                <Group justify="space-between" gap="xs" p="md" align="stretch">
                    <Flex direction="column" flex="1" gap="sm">
                        <Text className="mantine-Subtitle-root">
                            Diaper Quantities
                        </Text>
                        <Flex
                            direction="column"
                            className="round-outline"
                            p="md"
                        >
                            <Flex direction="column" gap="xs">
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
                    </Flex>

                    <Flex
                        direction={"column"}
                        className="break-word"
                        flex="1"
                        gap="sm"
                    >
                        <Title size="lg">Delivery Information</Title>
                        <Flex
                            flex="1"
                            p="md"
                            className="round-outline"
                            direction={"column"}
                        >
                            <Text>Distribution Place</Text>
                            <Text>{deliveryInfo.distributionPlace}</Text>
                        </Flex>
                        <Flex
                            flex="1"
                            p="md"
                            className="round-outline"
                            direction={"column"}
                        >
                            <Text>Date</Text>
                            <Text>{deliveryInfo.date?.toDateString()}</Text>
                        </Flex>
                    </Flex>
                </Group>
                {deliveryInfo.additionalInstructions != null &&
                    deliveryInfo.additionalInstructions != "" && (
                        <Flex direction="column" px="md">
                            {" "}
                            <Text ta="left">Additional Instructions</Text>
                            <Text> {deliveryInfo.additionalInstructions}</Text>
                        </Flex>
                    )}
            </Container>
        </>
    );
};

export default OrderFormReview;
