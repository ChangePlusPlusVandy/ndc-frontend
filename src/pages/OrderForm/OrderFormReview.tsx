import React, { useState, useEffect } from "react";
import { Title, Text, Container, Flex } from "@mantine/core";
import "../../styles/orderForm.css";

type ReviewProps = {
    sizes: any,
    deliveryInfo: any,
    numDiapers: number
};

const OrderFormReview: React.FC<ReviewProps> = ({sizes, deliveryInfo, numDiapers}: ReviewProps) => {

    return (
        <>
            <Container bg="white">
                <Title ta="center" m="lg">
                    Review Order
                </Title>
                <Text ta="center">
                    Review the information below to ensure everything is correct.
                </Text>
                <Container m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="lg">Diaper Quantities</Title>
                    <Text>Newborn: {sizes.newborn}</Text>
                    <Text>Size 1: {sizes.size1}</Text>
                    <Text>Size 2: {sizes.size2}</Text>
                    <Text>Size 3: {sizes.size3}</Text>
                    <Text>Size 4: {sizes.size4}</Text>
                    <Text>Size 5: {sizes.size5}</Text>
                    <Text>Size 6: {sizes.size6}</Text>
                    <Text>Total: {numDiapers}</Text>
                </Container>
                <Container className="break-word" m="lg" p="sm" bg="var(--mantine-color-blue-light)">
                    <Title size="lg">Delivery Information</Title>
                    <Text>Distribution Place: {deliveryInfo.distributionPlace}</Text>
                    <Text>Date: {deliveryInfo.date?.toDateString()}</Text>
                    <Text>Additional Instructions: {deliveryInfo.additionalInstructions}</Text>
                </Container>
            </Container>
        </>
    );
};

export default OrderFormReview;
