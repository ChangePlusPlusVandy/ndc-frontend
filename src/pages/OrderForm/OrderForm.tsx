import React, { useState} from "react";
import {
    Tabs,
    Flex,
    Container,
    Button,
    Modal,
    ScrollArea,
    CloseButton,
    Text
} from "@mantine/core";
import OrderFormRequest from "./OrderFormRequest";
import OrderFormDeliveryInfo from "./OrderFormDeliveryInfo";
import OrderFormConfirmation from "./OrderFormConfirmation";
import { useAuth } from "../../AuthContext";
import { IconSquarePlus } from "@tabler/icons-react";


const initialSizes = {
    newborn: 0,
    size1: 0,
    size2: 0,
    size3: 0,
    size4: 0,
    size5: 0,
    size6: 0,
};

const initialDeliveryInfo = {
    distributionPlace: "",
    date: null,
    additionalInstructions: "",
};

type OrderFormProps = {
    opened: boolean,
    open: any,
    close: any,
    isDashboardButton: boolean
};

const OrderForm: React.FC<OrderFormProps> = ({opened, open, close, isDashboardButton}: OrderFormProps) => {
    const [sizes, setSizes] = useState(initialSizes);
    const [activePage, setActivePage] = useState<string | null>("request-diapers");
    const [deliveryInfo, setDeliveryInfo] = useState(initialDeliveryInfo);

    const { mongoId, currentUser } = useAuth();
    //TODO: 
    //set a requirement that at least 1 diaper must be ordered
    // set up validation for the delivery info dates - force user to write something for the required parts

    const clearForm = () => {
        setSizes({ ...initialSizes });
        setDeliveryInfo({ ...initialDeliveryInfo });
    };

    

    const handleOpen = () => {
        clearForm();
        open();
        setActivePage("request-diapers");
    };

    const handleClose = () => {
        close();
    };

    const numDiapers = () => {
        return Number(
            Object.values(sizes).reduce((accumulator: any, value: any) => {
                return accumulator + value;
            }, 0)
        );
    };

    const handleSubmit = async () => {
        setActivePage("confirmation");
        const token = await currentUser?.getIdToken();
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/order`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    partner: mongoId,
                    datePlaced: deliveryInfo.date,
                    dateCompleted: null,
                    status: "PLACED",
                    numDiapers: numDiapers(),
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
                centered
                scrollAreaComponent={ScrollArea.Autosize}
            >
                <CloseButton onClick={handleClose} />
                {!(activePage == "confirmation") ? (
                    <>
                        <Tabs value={activePage} onChange={setActivePage}>
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
                                <Flex
                                    gap="md"
                                    justify="flex-end"
                                    direction="row"
                                    wrap="wrap"
                                >
                                    <Button
                                        onClick={() => setActivePage("delivery-info")}
                                        variant="filled"
                                        color="blue"
                                        m="lg"
                                    >
                                        Next
                                    </Button>
                                </Flex>
                            </Tabs.Panel>
                            <Tabs.Panel value="delivery-info">
                                <OrderFormDeliveryInfo
                                    deliveryInfo={deliveryInfo}
                                    setDeliveryInfo={setDeliveryInfo}
                                    initialDeliveryInfo={initialDeliveryInfo}
                                />
                                <Flex
                                    gap="md"
                                    justify="flex-end"
                                    direction="row"
                                    wrap="wrap"
                                >
                                    <Button
                                        onClick={() => setActivePage("request-diapers")}
                                        variant="outline"
                                        color="grey"
                                        m="lg"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        variant="filled"
                                        color="blue"
                                        m="lg"
                                    >
                                        Submit
                                    </Button>
                                </Flex>
                            </Tabs.Panel>
                        </Tabs>
                    </>
                ) : (

                    <OrderFormConfirmation
                        date={deliveryInfo.date}
                        distributionPlace={deliveryInfo.distributionPlace}
                        numDiapers={numDiapers()}
                    />
                )}
                
            </Modal>
            <Button radius="1rem" size="md" c="white" bg="gray" onClick={handleOpen}><Flex gap="md"><IconSquarePlus size="1.5rem" /><Text>Make an Order</Text></Flex></Button>
        </>
    );
};

export default OrderForm;
