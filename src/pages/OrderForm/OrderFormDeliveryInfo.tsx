import React, { useState, useEffect } from "react";
import {
    Title,
    Text,
    Container,
    TextInput,
    Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

type DeliveryProps = {
    date: Date | null,
    setDate: React.Dispatch<React.SetStateAction<Date | null>>
};

const OrderFormDeliveryInfo:React.FC<DeliveryProps> = ({ date, setDate }: DeliveryProps) => {
    return (
        <>
            <Container bg="white">
                <Title ta="center" m="lg">
                    Delivery Instructions
                </Title>
                <Container m="lg">
                    <Text size="sm">Distribution Place</Text>
                    <TextInput
                        placeholder="Name of Distribution Place"
                        size="sm"
                    />
                </Container>
                <Container m="lg">
                    <Text size="sm">Date</Text>
                    <DateInput
                        value={date}
                        onChange={setDate}
                        placeholder="Date input"
                    />
                </Container>
                <Container m="lg">
                    <Text size="sm">Additional Instructions</Text>
                    <Textarea
                        autosize
                        minRows={4}
                        placeholder="Placeholder"
                        size="sm"
                    />
                </Container>
            </Container>
        </>
    );
};

export default OrderFormDeliveryInfo;
