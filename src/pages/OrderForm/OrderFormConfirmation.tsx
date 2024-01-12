import React, { useState, useEffect } from "react";
import {
    Title,
    Text,
    Container,
} from "@mantine/core";

const OrderFormConfirmation: React.FC = () => {
    return (
        <>
            <Container bg="white">
                <Title ta="center" m="lg">
                    Order Received!
                </Title>
                <Text ta="center">We will be processing your order shortly!</Text>
                <Container m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="md">Order Date</Title>
                    <Text>10:00pm 10/10/2023</Text>
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
                    <Text>1000</Text>
                </Container>
                
            </Container>
        </>
    );
};

export default OrderFormConfirmation;
