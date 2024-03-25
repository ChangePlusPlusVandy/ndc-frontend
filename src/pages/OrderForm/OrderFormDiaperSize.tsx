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
    const [showControls, setShowControls] = useState<boolean>(false);
    const handleChange = (e: string | number) => {
        setValue(e);
        updateSize(keyName, e);
    };

    return (
        <>
            <Flex
                direction="column"
                flex="1"
                align="stretch"
                p="xs"
            >
                <Group gap="lg">
                    <Text size="md">{typeName}</Text>
                    <Flex justify="center" align="center">
                        <NumberInput
                            className="number-input"
                            variant="unstyled"
                            
                            value={value}
                            onChange={handleChange}
                            size="xs"
                            placeholder="0 - 1000"
                            clampBehavior="strict"
                            allowDecimal={false}
                            thousandSeparator=","
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            hideControls
                            min={0}
                            max={1000}
                        />
                    </Flex>
                </Group>

                <Slider
                    value={Number(value)}
                    className="slider"
                    onChange={handleChange}
                    color="var(--primary-color)"
                    showLabelOnHover={false}
                    marks={[
                        { value: 0, label: "0" },
                        { value: 1000, label: "1000" },
                    ]}
                    size="xs"
                    thumbSize={15}
                    min={0}
                    max={1000}
                    m="xs"
                />
            </Flex>
        </>
    );
};

export default OrderFormDiaperSize;
