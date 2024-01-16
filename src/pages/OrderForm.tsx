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
import { set } from "react-hook-form";

const initialSizes = {
    newborn: 1,
    size1: 1,
    size2: 1,
    size3: 1,
    size4: 1,
    size5: 1,
    size6: 1,
};

const OrderForm: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [date, setDate] = useState<Date | null>(null);
    const [sizes, setSizes] = useState(initialSizes);
    const [submit, setSubmit] = useState(false);

    const clearSizes = () => {
        setSizes({ ...initialSizes });
    };

    const delay = (ms: any) => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const handleClose = () => {
        close();
        clearSizes();
        setSubmit(false);
    };

    const handleSubmit = async () => {
        setSubmit(true);
        //handleClose(); //TODO: add this after everything else
        const numDiapers =
            Number(sizes.newborn) +
            Number(sizes.size1) +
            Number(sizes.size2) +
            Number(sizes.size3) +
            Number(sizes.size4) +
            Number(sizes.size5) +
            Number(sizes.size6);
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    partner: null, // TODO
                    id: null, // TODO
                    datePlaced: date,
                    dateCompleted: null,
                    status: "PLACED",
                    numDiapers: numDiapers,
                    newborn: sizes.newborn,
                    size1: sizes.size1,
                    size2: sizes.size2,
                    size3: sizes.size3,
                    size4: sizes.size4,
                    size5: sizes.size5,
                    size6: sizes.size6,
                }),
            }
        );
    };

    return (
        <>
            <Modal
                size="xl"
                opened={opened}
                onClose={handleClose}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                withCloseButton={false}
                scrollAreaComponent={ScrollArea.Autosize}
            >
                <CloseButton onClick={handleClose} />

                {!submit ? (
                    <>
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
                                <OrderFormRequest
                                    sizes={sizes}
                                    setSizes={setSizes}
                                />
                            </Tabs.Panel>

                            <Tabs.Panel value="delivery-info">
                                <OrderFormDeliveryInfo
                                    date={date}
                                    setDate={setDate}
                                />
                                <Flex
                                    gap="md"
                                    justify="flex-end"
                                    direction="row"
                                    wrap="wrap"
                                >
                                    <Button
                                        onClick={handleSubmit}
                                        variant="filled"
                                        color="dark"
                                        m="lg"
                                    >
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
                    </>
                ) : (
                    <OrderFormConfirmation />
                )}
            </Modal>
            <Button onClick={open}>Open Form</Button>
        </>
    );
};

export default OrderForm;
