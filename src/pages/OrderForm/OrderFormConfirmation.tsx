import React from "react";
import { Title, Text, Container } from "@mantine/core";

type ConfirmationProps = {
    date: Date | null,
    numDiapers: any,
    distributionPlace: string | number
};

const OrderFormConfirmation: React.FC<ConfirmationProps> = ({date, numDiapers, distributionPlace}: ConfirmationProps) => {

    return (
        <>
            <Container bg="white">
                <Title ta="center" m="lg">
                    Order Received!
                </Title>
                <Text ta="center">
                    We will be processing your order shortly!
                </Text>
                <Container m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="md">Order Date</Title>
                    <Text>{date?.toDateString()}</Text>
                </Container>
                <Container m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="md">Order Status</Title>
                    <Text>Under Review</Text>
                </Container>
                <Container m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="md">Distribution Center</Title>
                    <Text>{distributionPlace}</Text>
                </Container>
                <Container m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="md">Order Quantity</Title>
                    <Text>{numDiapers}</Text>
                </Container>
            </Container>
        </>
    );
};

export default OrderFormConfirmation;
