import React from "react";
import { Stack, Flex, Text, Container, Card } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// Importing dashboard components
import Greeting from "./Greeting";
import MyAccountBtn from "./MyAccountBtn";
import ViewOrderBtn from "./ViewOrderBtn";
import { useNavigate } from "react-router-dom";
import "../../styles/PartnerDash.css";

import { IconCheck, IconMailOpened, IconBell } from "@tabler/icons-react";

import OrderForm from "../OrderForm/OrderForm";

function Dashboard() {
    const [opened, { open, close }] = useDisclosure(false);

    const navigate = useNavigate();
    const handleProfile = () => {
        navigate("./profile");
    };
    const handleOrderInfo = () => {
        navigate("./order-info");
    };
    return (
        <Container>
            <Flex p="md" wrap="wrap" justify="center">
                <Greeting></Greeting>
            </Flex>
            {/* main section */}
            <Stack p="xl" bg="#F1F3F5">
                <Flex
                    gap="lg"
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="stretch"
                >
                    <MyAccountBtn onClick={handleProfile}></MyAccountBtn>
                    <ViewOrderBtn onClick={handleOrderInfo}></ViewOrderBtn>

                    <OrderForm
                        isDashboardButton={true}
                        opened={opened}
                        open={open}
                        close={close}
                    />
                </Flex>
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    gap="lg"
                    align="stretch"
                >
                    <Flex
                        direction={"column"}
                        justify={"stretch"}
                        w={{ base: "100%", sm: "50%" }}
                        bg="white"
                        p="md"
                    >
                        <Text
                            pb={"lg"}
                            ta={{ base: "center", sm: "left" }}
                            c="black"
                        >
                            ORDERS
                        </Text>

                        <Flex
                            flex={1}
                            wrap={"wrap"}
                            direction="column"
                            align="space-between"
                            justify="space-between"
                            gap={"lg"}
                        >
                            <Card
                                radius="xs"
                                ta="left"
                                variant="filled"
                                bg="gray"
                                p="lg"
                            >
                                <Flex
                                    gap={{ base: "md", md: "sm" }}
                                    align="center"
                                    direction={{ base: "column", md: "row" }}
                                    c="white"
                                    w="100%"
                                >
                                    <IconMailOpened size={"1.5rem"} />
                                    <Text>OPEN</Text>
                                    <Flex
                                        justify={"flex-end"}
                                        flex="1"
                                        ta="right"
                                    >
                                        <Text>250+</Text>
                                    </Flex>
                                </Flex>
                            </Card>
                            <Card
                                radius="xs"
                                ta="left"
                                variant="filled"
                                bg="gray"
                                p="lg"
                            >
                                <Flex
                                    gap={{ base: "md", md: "sm" }}
                                    align="center"
                                    direction={{ base: "column", md: "row" }}
                                    c="white"
                                    w="100%"
                                >
                                    <IconBell size={"1.5rem"} />
                                    <Text>UNREVIEWED</Text>
                                    <Flex
                                        justify={"flex-end"}
                                        flex="1"
                                        ta="right"
                                    >
                                        <Text>250+</Text>
                                    </Flex>
                                </Flex>
                            </Card>
                            <Card
                                radius="xs"
                                ta="left"
                                variant="filled"
                                bg="gray"
                                p="lg"
                            >
                                <Flex
                                    gap={{ base: "md", md: "sm" }}
                                    align="center"
                                    direction={{ base: "column", md: "row" }}
                                    c="white"
                                    w="100%"
                                >
                                    <IconCheck size={"1.5rem"} />
                                    <Text>APPROVED</Text>
                                    <Flex
                                        justify={"flex-end"}
                                        flex="1"
                                        ta="right"
                                    >
                                        <Text>250+</Text>
                                    </Flex>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>

                    <Flex
                        wrap="nowrap"
                        direction="column"
                        justify="end"
                        w={{ base: "100%", sm: "50%" }}
                        bg="white"
                        p="md"
                    >
                        <Flex h="20rem"></Flex>
                        <Flex
                            direction={{ base: "column", sm: "row" }}
                            gap="lg"
                            justify="space-between"
                            align={{ base: "normal", sm: "stretch" }}
                        >
                            <Card
                                w={{ base: "100%", sm: "33%" }}
                                radius="xs"
                                bg="gray"
                                c="white"
                                component="button"
                            >
                                <Flex
                                    flex={1}
                                    w={"100%"}
                                    direction={"column"}
                                    justify={"space-between"}
                                    align="center"
                                >
                                    <Text size="xs">Last Year</Text>
                                    <Text size="lg">250+</Text>
                                </Flex>
                            </Card>
                            <Card
                                w={{ base: "100%", sm: "33%" }}
                                radius="xs"
                                bg="gray"
                                ta="center"
                                c="white"
                                component="button"
                            >
                                <Flex
                                    flex={1}
                                    w={"100%"}
                                    direction={"column"}
                                    justify={"space-between"}
                                    align="center"
                                >
                                    <Text size="xs">Last 6 Months</Text>
                                    <Text size="lg">100</Text>
                                </Flex>
                            </Card>
                            <Card
                                w={{ base: "100%", sm: "33%" }}
                                radius="xs"
                                bg="gray"
                                ta="center"
                                c="white"
                                component="button"
                            >
                                <Flex
                                    flex={1}
                                    w={"100%"}
                                    direction={"column"}
                                    justify={"space-between"}
                                    align="center"
                                >
                                    <Text size="xs">Last Month</Text>

                                    <Text size="lg">100</Text>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                </Flex>
            </Stack>
        </Container>
    );
}

export default Dashboard;
