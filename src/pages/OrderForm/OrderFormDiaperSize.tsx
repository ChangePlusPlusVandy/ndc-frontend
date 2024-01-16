import React, { useState, useEffect } from "react";
import { Group, Text, Container, Slider, NumberInput } from "@mantine/core";

type SizeProps = {
    typeName: string,
    keyName: string,
    updateSize: any,
    initialSize: string | number
};

const OrderFormDiaperSize: React.FC<SizeProps> = ({ typeName,  keyName, updateSize, initialSize }: SizeProps) => {
    const [value, setValue] = useState<string | number>(initialSize);

    const handleChange = (e: string | number) => {
        setValue(e);
        updateSize(keyName, e);
    };

    return (
        <>
            <Container m="lg" p="lg" bg="var(--mantine-color-blue-light)">
                <Group m="">
                    <Text size="md">{typeName}</Text>
                    <NumberInput
                        value={value}
                        onChange={handleChange}
                        size="sm"
                        placeholder="1 - 1000"
                        clampBehavior="strict"
                        allowDecimal={false}
                        min={1}
                        max={1000}
                    />
                </Group>

                <Slider
                
                    value={Number(value)}
                    onChange={handleChange}
                    color="blue"
                    showLabelOnHover={false}
                    marks={[
                        { value: 1, label: "1" },
                        { value: 1000, label: "1000" },
                    ]}
                    min={1}
                    max={1000}
                    m="xs"
                />
            </Container>
        </>
    );
};

export default OrderFormDiaperSize;
