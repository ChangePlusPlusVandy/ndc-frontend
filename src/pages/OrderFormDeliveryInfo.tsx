import React, { useState, useEffect } from "react";
import {
    Group,
    Flex,
    Title,
    Text,
    Container,
    Button,
    Modal,
    TextInput,
    Textarea,
    ScrollArea,
    NumberInput,
    CloseButton,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import OrderFormDiaperSize from "./OrderFormDiaperSize";
import { openConfirmModal, closeAllModals } from "@mantine/modals";
import OrderFormRequest from "./OrderFormRequest";

const OrderFormDeliveryInfo: React.FC = () => {
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
                        popoverProps={{ withinPortal: true }}
                        placeholder="Date input"
                        size="sm"
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
