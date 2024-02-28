import React, { useState, useEffect } from "react";
import { Stack, Flex, Text, Container, Card, Checkbox} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// Importing dashboard components
import Greeting from "./Greeting";
import MyAccountBtn from "./MyAccountBtn";
import ViewOrderBtn from "./ViewOrderBtn";
import { useNavigate } from "react-router-dom";
import "../../styles/PartnerDash.css";
import { useAuth } from "../../AuthContext";
import { IconCheck, IconMailOpened, IconBell } from "@tabler/icons-react";
import OrderForm from "../OrderForm/OrderForm";

// Delete
import Partner from './PartnerClass';

interface PartnerResponse {
    numOrdersMonth: number;
    numOrdersYTD: number;
    status: string;
}

function Dashboard() {

    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const { mongoId, currentUser } = useAuth();

    // NEW, GRAPH DATA
    const [numOrdersMonth, setNumOrdersMonth] = useState<number>(0);
    const [numOrdersYTD, setNumOrdersYTD] = useState<number>(0);

    // DELEETE, SIDE BAR DATA
    const [numOpenOrders, setNumOpenOrders] = useState<number>(0);
    const [numUnreviewedOrders, setNumUnreviewedOrders] = useState<number>(0);
    const [numClosedOrders, setNumClosedOrders] = useState<number>(0);

    useEffect(() => {
        // Line old
        console.log(currentUser);

        const getPartnerOrders = async () => {
            try{
                const token = await currentUser?.getIdToken();
                
                let resPartner = await fetch(`${import.meta.env.VITE_BACKEND_URL}/partner?id=${mongoId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                let resOrders = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order?partnerId=${mongoId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                let dataPartner = await resPartner.json();
                let numOrdersMonthArr = dataPartner.numOrdersMonth;
                let numOrdersYTDArr = dataPartner.numOrdersYTD;

                let dataOrders = await resOrders.json();
                let numOrdersOpen = dataOrders.filter((elem: PartnerResponse) => elem.status === "OPEN").length;
                let numOrdersUnreviewed = dataOrders.filter((elem: PartnerResponse) => elem.status === "UNREVIEWED").length;
                let numOrdersClosed = dataOrders.filter((elem: PartnerResponse) => elem.status === "FILLED").length;

                setNumOrdersMonth(numOrdersMonthArr);
                setNumOrdersYTD(numOrdersYTDArr);
                setNumOpenOrders(numOrdersOpen);
                setNumUnreviewedOrders(numOrdersUnreviewed);
                setNumClosedOrders(numOrdersClosed);

                // TEST
                console.log('numOrdersMonthArr:', numOrdersMonthArr);
                console.log('numOrdersYTDArr:', numOrdersYTDArr);
                console.log('numOrdersClkosed:', numOrdersClosed);

            } catch (err){
                console.error(err);
            }
        };
        getPartnerOrders();
    }, []);
    
    const handleProfile = () => {
        navigate("./profile");
    };
    const handleOrderInfo = () => {
        navigate("./order-info");
    };
    
    return (
        <Container px="6em" fluid>
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
                                        <Text>{numOpenOrders}</Text>
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
                                        <Text>{numUnreviewedOrders}</Text>
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
                                        <Text>{numClosedOrders}</Text>
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
                                    <Text size="lg">{numOrdersYTD}</Text>
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

                                    <Text size="lg">{numOrdersMonth}</Text>
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
