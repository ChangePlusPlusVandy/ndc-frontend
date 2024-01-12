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
import OrderFormRequest from "./OrderForm/OrderFormRequest";
import OrderFormDeliveryInfo from "./OrderForm/OrderFormDeliveryInfo";
import OrderFormConfirmation from "./OrderForm/OrderFormConfirmation";

const OrderForm: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [date, setDate] = useState<Date | null>(null);
    const [newborn, setNewborn] = useState<string | number>(1);
    const [size1, setSize1] = useState<string | number>(1);
    const [size2, setSize2] = useState<string | number>(1);
    const [size3, setSize3] = useState<string | number>(1);
    const [size4, setSize4] = useState<string | number>(1);
    const [size5, setSize5] = useState<string | number>(1);
    const [size6, setSize6] = useState<string | number>(1);

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3000/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                datePlaced: date,
                status: "PLACED",
                numDiapers:
                    Number(newborn) +
                    Number(size1) +
                    Number(size2) +
                    Number(size3) +
                    Number(size4) +
                    Number(size5) +
                    Number(size6),
                newborn: newborn,
                size1: size1,
                size2: size2,
                size3: size3,
                size4: size4,
                size5: size5,
                size6: size6,
            }),
        });
    };

    useEffect(() => {
        fetch("http://localhost:3000/order", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    });

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
                        <OrderFormRequest
                            newborn={newborn}
                            setNewborn={setNewborn}
                            size1={size1}
                            setSize1={setSize1}
                            size2={size2}
                            setSize2={setSize2}
                            size3={size3}
                            setSize3={setSize3}
                            size4={size4}
                            setSize4={setSize4}
                            size5={size5}
                            setSize5={setSize5}
                            size6={size6}
                            setSize6={setSize6}
                        />
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
