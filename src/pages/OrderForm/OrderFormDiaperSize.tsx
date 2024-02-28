import React, { useState } from "react";
import {
    Flex,
    Group,
    Text,
    Container,
    Slider,
    NumberInput,
} from "@mantine/core";

type SizeProps = {
    typeName: string;
    keyName: string;
    updateSize: any;
    initialSize: string | number;
};

const OrderFormDiaperSize: React.FC<SizeProps> = ({
    typeName,
    keyName,
    updateSize,
    initialSize,
}: SizeProps) => {
    const [value, setValue] = useState<string | number>(initialSize);

    const handleChange = (e: string | number) => {
        setValue(e);
        updateSize(keyName, e);
    };

    return (
        <>
            <Container fluid my="lg" p="lg" bg="var(--mantine-color-blue-light)">
                <Group>
                    <Text size="md">{typeName}</Text>
                    <Flex w="6rem" justify="center" align="center">
                        {/*TODO: need to make it look better for mobile */}
                        <NumberInput
                            ta="center"
                            value={value}
                            onChange={handleChange}
                            size="sm"
                            placeholder="0 - 1000"
                            clampBehavior="strict"
                            allowDecimal={false}
                            thousandSeparator=","
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            min={0}
                            max={1000}
                        />
                    </Flex>
                </Group>

                <Slider
                    value={Number(value)}
                    onChange={handleChange}
                    color="blue"
                    showLabelOnHover={false}
                    marks={[
                        { value: 0, label: "0" },
                        { value: 1000, label: "1000" },
                    ]}
                    min={0}
                    max={1000}
                    m="xs"
                />
            </Container>
        </>
    );
};

export default OrderFormDiaperSize;
