import React, { useState, useEffect } from "react";
import {
    Group,
    CloseButton,
    Title,
    Text,
    Container,
    Slider,
    Button,
    Input,
    NumberInput,
} from "@mantine/core";

const OrderForm: React.FC = () => {
    return (
        <>
            {/*form part 1*/}
            <Container bg="white">
                <CloseButton />
                <Title ta="center" m="lg">Request Diapers</Title>
                <Container m="lg" p="lg" bg="var(--mantine-color-blue-light)">
                    <Group m="lg">
                        <Text size="lg">Newborn Diapers</Text>
                        <NumberInput placeholder="1-100" min={1} max={100} />
                    </Group>

                    <Slider
                        color="blue"
                        showLabelOnHover={false}
                        marks={[
                            { value: 1, label: "1" },
                            { value: 100, label: "100" },
                        ]}
                        min={1}
                        max={100}
                        m="lg"
                    />
                </Container>
                <Container m="lg" p="lg" bg="var(--mantine-color-blue-light)">
                    <Group m="lg">
                        <Text size="lg">Diaper 2</Text>
                        <NumberInput placeholder="1-100" min={1} max={100} />
                    </Group>

                    <Slider
                        color="blue"
                        showLabelOnHover={false}
                        marks={[
                            { value: 1, label: "1" },
                            { value: 100, label: "100" },
                        ]}
                        min={1}
                        max={100}
                        m="lg"
                    />
                </Container>
                <Container m="lg" p="lg" bg="var(--mantine-color-blue-light)">
                    <Group m="lg">
                        <Text size="lg">Idk</Text>
                        <NumberInput placeholder="1-100" min={1} max={100} />
                    </Group>

                    <Slider
                        color="blue"
                        showLabelOnHover={false}
                        marks={[
                            { value: 1, label: "1" },
                            { value: 100, label: "100" },
                        ]}
                        min={1}
                        max={100}
                        m="lg"
                    />
                </Container>

                <Button justify="right" variant="filled" color="gray" m="lg">
                    Enter Delivery Info.
                </Button>
            </Container>

            {/*form part 2*/}
            <div>
                <button>x</button>
                <h1>Delivery Instructions</h1>

                <label>
                    <h3>Distribution Place</h3>
                    <input type="text" />
                </label>
                <label>
                    <h3>Date</h3>
                    <input type="date" />
                </label>
                <label>
                    <h3>Additional Instructions</h3>
                    <input type="text" />
                </label>
                <button>Edit quantities</button>
                <button>Submit</button>
            </div>
        </>
    );
};

export default OrderForm;
