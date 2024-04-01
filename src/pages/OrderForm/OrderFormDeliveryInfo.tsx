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
        deliveryInfo.distributionPlace
    );
    const [date, setDate] = useState<Date | null>(deliveryInfo.date);
    const [additionalInstructions, setAdditionalInstructions] = useState<
        string | number
    >(deliveryInfo.additionalInstructions);

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
                <Container m="lg">
                    <TextInput
                        required
                        label="Distribution Place"
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
                    <DateInput
                        required
                        label="Date"
                        value={date}
                        onChange={handleDate}
                        placeholder={"January 1, 2024"}
                    />
                </Container>
                <Container m="lg">
                    <Textarea
                        label="Additional Instructions"
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
