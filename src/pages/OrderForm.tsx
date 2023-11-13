import React, { useState, useEffect } from "react";
import {
    Tabs,
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
import OrderFormDeliveryInfo from "./OrderFormDeliveryInfo";

const OrderForm: React.FC = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                size="xl"
                opened={opened}
                onClose={close}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                withCloseButton={false}
                
                scrollAreaComponent={ScrollArea.Autosize}
            >
                <CloseButton onClick={close} />

                <Tabs defaultValue="request-diapers">
                    <Container m="md">
                        <Tabs.List grow justify="center">
                            <Tabs.Tab value="request-diapers">
                                Request Diapers
                            </Tabs.Tab>
                            <Tabs.Tab value="delivery-info">
                                Delivery Information
                            </Tabs.Tab>
                        </Tabs.List>
                    </Container>
                    <Tabs.Panel value="request-diapers">
                        <OrderFormRequest />
                    </Tabs.Panel>

                    <Tabs.Panel value="delivery-info">
                        <OrderFormDeliveryInfo />
                        <Flex
                            gap="md"
                            justify="flex-end"
                            direction="row"
                            wrap="wrap"
                        >
                            <Button variant="filled" color="dark" m="lg">
                                Submit
                            </Button>
                        </Flex>
                    </Tabs.Panel>
                </Tabs>

                {/*<Flex gap="md" justify="flex-end" direction="row" wrap="wrap">
                    <Button
                        justify="flex-end"
                        variant="filled"
                        color="gray"
                        m="lg"
                    >
                        Enter Delivery Info
                    </Button>
                </Flex>

                <Flex gap="md" justify="flex-end" direction="row" wrap="wrap">
                    <Button variant="filled" color="gray" m="lg">
                        Edit quantities
                    </Button>
                    <Button variant="filled" color="dark" m="lg">
                        Submit
                    </Button>
            </Flex>*/}
            </Modal>

            <Button onClick={open}>Open Form</Button>
        </>
    );
};

export default OrderForm;
