import React, { useState, useEffect } from "react";
import {
    Tabs,
    Flex,
    Container,
    Button,
    Modal,
    ScrollArea,
    CloseButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import OrderFormRequest from "./OrderFormRequest";
import OrderFormDeliveryInfo from "./OrderFormDeliveryInfo";
import OrderFormConfirmation from "./OrderFormConfirmation";

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
                            <Tabs.Tab value="confirmation">
                                Confirmation
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

                    <Tabs.Panel value="confirmation">
                        <OrderFormConfirmation />
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
