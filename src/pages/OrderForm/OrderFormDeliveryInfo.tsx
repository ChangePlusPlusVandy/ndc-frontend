import React, { useState } from "react";
import { Title, Text, Container, TextInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";

type DeliveryProps = {
    deliveryInfo: any;
    setDeliveryInfo: any;
    initialDeliveryInfo: any;
};

const OrderFormDeliveryInfo: React.FC<DeliveryProps> = ({
    deliveryInfo,
    setDeliveryInfo,
    initialDeliveryInfo,
}: DeliveryProps) => {
    const [distributionPlace, setDistributionPlace] = useState<string | number>(
        initialDeliveryInfo.distributionPlace
    );
    const [date, setDate] = useState<Date | null>(initialDeliveryInfo.date);
    const [additionalInstructions, setAdditionalInstructions] = useState<
        string | number
    >(initialDeliveryInfo.additionalInstructions);

    const updateDeliveryInfo = (field: string, value: any) => {
        setDeliveryInfo((prevDeliveryInfo: any) => ({
            ...prevDeliveryInfo,
            [field]: value,
        }));
    };

    // currently not using since it causes lag, keeping just in case
    const handleDistributionPlace = (e: any) => {
        setDistributionPlace(e.currentTarget.value);
        updateDeliveryInfo("distributionPlace", e.currentTarget.value);
    };

    const handleDate = (e: Date | null) => {
        setDate(e);
        updateDeliveryInfo("date", e);
    };

    const handleAdditionalInstructions = (e: any) => {
        setAdditionalInstructions(e.currentTarget.value);
        updateDeliveryInfo("additionalInstructions", e.currentTarget.value);
    };

    return (
        <>
            <Container bg="white">
                <Title ta="center" m="lg">
                    Delivery Instructions
                </Title>

                <Container m="lg">
                    <Text size="sm">
                        Distribution Place
                        <Text component="span" c="red">
                            {" "}
                            *
                        </Text>
                    </Text>

                    <TextInput
                        placeholder="Name of Distribution Place"
                        value={distributionPlace}
                        onChange={(e: any) =>
                            setDistributionPlace(e.target.value)
                        }
                        onBlur={(e: any) =>
                            updateDeliveryInfo(
                                "distributionPlace",
                                e.target.value
                            )
                        }
                        onPointerLeave={(e: any) =>
                            updateDeliveryInfo(
                                "distributionPlace",
                                e.target.value
                            )
                        }
                        size="sm"
                    />
                </Container>
                <Container m="lg">
                    <Text size="sm">
                        Date
                        <Text component="span" c="red">
                            {" "}
                            *
                        </Text>
                    </Text>
                    <DateInput
                        value={date}
                        onChange={handleDate}
                        placeholder="Date input"
                    />
                </Container>
                <Container m="lg">
                    <Text size="sm">Additional Instructions</Text>
                    <Textarea
                        value={additionalInstructions}
                        autosize
                        minRows={4}
                        placeholder="Placeholder"
                        size="sm"
                        onChange={(e: any) =>
                            setAdditionalInstructions(e.target.value)
                        }
                        onBlur={(e: any) =>
                            updateDeliveryInfo(
                                "additionalInstructions",
                                e.target.value
                            )
                        }
                        onPointerLeave={(e: any) =>
                            updateDeliveryInfo(
                                "additionalInstructions",
                                e.target.value
                            )
                        }
                    />
                </Container>
            </Container>
        </>
    );
};

export default OrderFormDeliveryInfo;
