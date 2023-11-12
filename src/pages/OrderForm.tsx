import React, { useState, useEffect } from "react";
import {
    Flex,
    Title,
    Text,
    Container,
    Button,
    Modal,
    TextInput,
    Textarea,
    ScrollArea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import OrderFormDiaperSize from "./OrderFormDiaperSize";

const OrderForm: React.FC = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [newbornSizeAmount, setNewbornSizeAmount] = useState<string | number>(
        1
    );
    const [sizeOneAmount, setSizeOneAmount] = useState<string | number>(1);
    const [sizeTwoAmount, setSizeTwoAmount] = useState<string | number>(1);
    const [sizeThreeAmount, setSizeThreeAmount] = useState<string | number>(1);
    const [sizeFourAmount, setSizeFourAmount] = useState<string | number>(1);
    const [sizeFiveAmount, setSizeFiveAmount] = useState<string | number>(1);
    const [sizeSixAmount, setSizeSixAmount] = useState<string | number>(1);
    return (
        <>
            {/*form part 1*/}
            <Modal
                size="xl"
                opened={opened}
                onClose={close}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                withCloseButton={false}
                centered
                scrollAreaComponent={ScrollArea.Autosize}
            >
                <Container bg="white">
                    <Title ta="center" m="lg">
                        Request Diapers
                    </Title>
                    <OrderFormDiaperSize
                        amount={newbornSizeAmount}
                        setAmount={setNewbornSizeAmount}
                        typeName="Newborn Diapers"
                    />
                    <OrderFormDiaperSize
                        amount={sizeOneAmount}
                        setAmount={setSizeOneAmount}
                        typeName="Size 1"
                    />
                    <OrderFormDiaperSize
                        amount={sizeTwoAmount}
                        setAmount={setSizeTwoAmount}
                        typeName="Size 2"
                    />
                    <OrderFormDiaperSize
                        amount={sizeThreeAmount}
                        setAmount={setSizeThreeAmount}
                        typeName="Size 3"
                    />
                    <OrderFormDiaperSize
                        amount={sizeFourAmount}
                        setAmount={setSizeFourAmount}
                        typeName="Size 4"
                    />
                    <OrderFormDiaperSize
                        amount={sizeFiveAmount}
                        setAmount={setSizeFiveAmount}
                        typeName="Size 5"
                    />
                    <OrderFormDiaperSize
                        amount={sizeSixAmount}
                        setAmount={setSizeSixAmount}
                        typeName="Size 6"
                    />

                    <Flex
                        gap="md"
                        justify="flex-end"
                        direction="row"
                        wrap="wrap"
                    >
                        <Button
                            justify="flex-end"
                            variant="filled"
                            color="gray"
                            m="lg"
                        >
                            Enter Delivery Info
                        </Button>
                    </Flex>
                </Container>
            </Modal>

            <Button onClick={open}>Open Form</Button>

            {/*form part 2*/}
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
                    {/*TODO: switch to using date input from @mantine/dates*/}
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

                <Flex gap="md" justify="flex-end" direction="row" wrap="wrap">
                    <Button variant="filled" color="gray" m="lg">
                        Edit quantities
                    </Button>
                    <Button variant="filled" color="dark" m="lg">
                        Submit
                    </Button>
                </Flex>
            </Container>
        </>
    );
};

export default OrderForm;
