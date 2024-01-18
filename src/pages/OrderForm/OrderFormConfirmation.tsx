import React, { useState, useEffect } from "react";
import { Title, Text, Container } from "@mantine/core";

type ConfirmationProps = {
    date: any,
    numDiapers: any
};

const OrderFormConfirmation: React.FC<ConfirmationProps> = ({date, numDiapers}: ConfirmationProps) => {

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
                    <Text>{date}</Text>
                </Container>
                <Container m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="md">Order Status</Title>
                    <Text>Under Review</Text>
                </Container>
                <Container m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="md">Distribution Center</Title>
                    <Text>Placeholder</Text>
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
