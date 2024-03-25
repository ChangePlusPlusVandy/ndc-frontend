import React, { useState } from "react";
import {
    Tabs,
    Flex,
    Container,
    Button,
    Modal,
    ScrollArea,
    CloseButton,
    Text,
    Stepper,
    Group,
} from "@mantine/core";
import OrderFormRequest from "./OrderFormRequest";
import OrderFormDeliveryInfo from "./OrderFormDeliveryInfo";
import OrderFormReview from "./OrderFormReview";
import OrderFormConfirmation from "./OrderFormConfirmation";
import { useAuth } from "../../AuthContext";
import {
    IconSquarePlus,
    IconArrowNarrowLeft,
    IconArrowNarrowRight,
} from "@tabler/icons-react";

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
    opened: boolean;
    open: any;
    close: any;
    isDashboardButton: boolean;
};

const OrderForm: React.FC<OrderFormProps> = ({
    opened,
    open,
    close,
    isDashboardButton,
}: OrderFormProps) => {
    const [sizes, setSizes] = useState(initialSizes);

    const [active, setActive] = useState(1);
    const [highestStepVisited, setHighestStepVisited] = useState(active);

    const handleStepChange = (nextStep: number) => {
        const isOutOfBounds = nextStep > 3 || nextStep < 0;

        if (isOutOfBounds) {
            return;
        }

        setActive(nextStep);
        setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
    };

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
        setActive(0);
        setHighestStepVisited(0);
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
        handleStepChange(active + 1);
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

    // Allow the user to freely go back and forth between visited steps.
    const shouldAllowSelectStep = (step: number) =>
        highestStepVisited >= step && active !== step;

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
                bg="var(--light-color)"
                scrollAreaComponent={ScrollArea.Autosize}
                radius="lg"
            >
                <Flex px="lg" justify="end">
                    <CloseButton onClick={handleClose} />
                </Flex>
                <Flex p="lg" direction="column">
                    <Stepper
                        size="sm"
                        px="lg"
                        color="var(--primary-color)"
                        active={active}
                        onStepClick={setActive}
                    >
                        <Stepper.Step
                            label="Request Diapers"
                            allowStepSelect={shouldAllowSelectStep(0)}
                        >
                            <OrderFormRequest
                                sizes={sizes}
                                setSizes={setSizes}
                            />
                            <Flex justify="center">
                                <Button
                                    className="round-button"
                                    size="sm"
                                    rightSection={<IconArrowNarrowRight />}
                                    color="var(--primary-color)"
                                    onClick={() => handleStepChange(active + 1)}
                                >
                                    Delivery Instructions
                                </Button>
                            </Flex>
                        </Stepper.Step>
                        <Stepper.Step
                            label="Delivery Information"
                            allowStepSelect={shouldAllowSelectStep(1)}
                        >
                            <OrderFormDeliveryInfo
                                deliveryInfo={deliveryInfo}
                                setDeliveryInfo={setDeliveryInfo}
                                initialDeliveryInfo={initialDeliveryInfo}
                            />
                            <Group justify="center" mt="xl">
                                <Button
                                    leftSection={<IconArrowNarrowLeft />}
                                    color="var(--primary-color)"
                                    variant="default"
                                    className="round-button"
                                    onClick={() => handleStepChange(active - 1)}
                                >
                                    Request Diapers
                                </Button>
                                <Button
                                    rightSection={<IconArrowNarrowRight />}
                                    color="var(--primary-color)"
                                    className="round-button"
                                    onClick={() => handleStepChange(active + 1)}
                                >
                                    Review Order
                                </Button>
                            </Group>
                        </Stepper.Step>
                        <Stepper.Step
                            label="Review Order"
                            allowStepSelect={shouldAllowSelectStep(2)}
                        >
                            <OrderFormReview
                                sizes={sizes}
                                deliveryInfo={deliveryInfo}
                                numDiapers={numDiapers()}
                            />
                            <Group justify="center" mt="xl">
                                <Button
                                    leftSection={<IconArrowNarrowLeft />}
                                    color="var(--primary-color)"
                                    variant="default"
                                    className="round-button"
                                    onClick={() => handleStepChange(active - 1)}
                                >
                                    Delivery Instructions
                                </Button>
                                <Button
                                    color="var(--primary-color)"
                                    className="round-button"
                                    onClick={() => handleSubmit()}
                                >
                                    Submit Order
                                </Button>
                            </Group>
                        </Stepper.Step>

                        <Stepper.Completed>
                            <OrderFormConfirmation
                                date={deliveryInfo.date}
                                distributionPlace={
                                    deliveryInfo.distributionPlace
                                }
                                numDiapers={numDiapers()}
                                sizes={sizes}
                            />
                        </Stepper.Completed>
                    </Stepper>
                </Flex>
            </Modal>
            <Button
                radius="0.5rem"
                size="md"
                color="var(--primary-color)"
                onClick={handleOpen}
            >
                <Flex gap="md">
                    <IconSquarePlus size="1.5rem" />
                    <Text c={"var(--light-color)"}>Make an Order</Text>
                </Flex>
            </Button>
        </>
    );
};

export default OrderForm;
