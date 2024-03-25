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
            <Flex direction="column" flex="1" align="stretch" p="xs">
                <Group flex="1" gap="lg">
                    <Text size="sm">{typeName}</Text>
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
                <Group flex="1" align="center" justify="space-between">
                    <Text size="xs">0</Text>
                    <Slider
                    flex={1}
                        value={Number(value)}
                        className="slider"
                        onChange={handleChange}
                        color="var(--primary-color)"
                        showLabelOnHover={false}
                      
                        size="xs"
                        thumbSize={15}
                        min={0}
                        max={1000}
                        m="xs"
                    />
                    <Text size="xs">1000</Text>
                </Group>
            </Flex>
        </>
    );
};

export default OrderFormDiaperSize;
