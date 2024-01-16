import React from 'react';
import {Flex, Button, Text, Title, Container, Image} from '@mantine/core';

// Importing dashboard components
import Greeting from "./Greeting";
import MakeOrderBtn from "./MakeOrderBtn";
import MyAccountBtn from "./MyAccountBtn";
import ViewOrderBtn from "./ViewOrderBtn";
import logo from './Images/logo.png';
import placeholder from './Images/placeholder.png';
import {useNavigate} from "react-router-dom";

import OrderForm from '../OrderForm';


function Dashboard() {
    const navigate = useNavigate();
    const handleProfile = () =>{
        navigate('./profile');
    }
    return (
        <>
            <OrderForm />
            <Flex direction = "row">

                {/* image section */}
                <Flex w = {150} mt = {30} direction = "column">
                    <Image onClick={handleProfile}  style={{ alignSelf: 'flex-start' }} fit= "contain" radius = "md" h = {60} src = {logo} alt = "Logo"/>
                </Flex>

                {/* main section */}
                <Flex bg = "#F1F3F5" direction = "column" w = "80%">
                    <Container size = "80%" /*bg = "#F1F3F5"*/>
                        <Flex direction="row" wrap="wrap" justify = "center" ml = {10} pt = {30} pb = {25}>
                            <Greeting></Greeting>
                        </Flex>
                        <Flex pb = {20} direction = "row" gap = {40} justify = "center">
                            <MyAccountBtn></MyAccountBtn>
                            <ViewOrderBtn></ViewOrderBtn>
                            <MakeOrderBtn></MakeOrderBtn>
                        </Flex>
                    </Container>

                    
                    <Flex direction = "row" justify = "center" style = {{gap: 70, justifyContent: 'center'}}>
                        
                        {/* Left column, orders */}
                        <Flex wrap = "nowrap" direction = "column" bg = "white" mt = {10} w = {250} ml = "10%" h = {400} mb = {30}>
                            <Text ml = {15} mr = {15} c = "black" fw = {700} mb = {20}>
                                ORDERS
                            </Text>
                            <Button h = {50} radius = "xs" ml = {15} mr = {15} mb = {20} w = "88%" justify = "left" variant = "filled" color = "gray">
                                <Image mt = {11} style={{alignSelf: 'flex-start' }} fit= "contain" radius = "md" h = {25} src = {placeholder} alt = "Placeholder" />
                                <Text ml = {10} c = "white" size = "sm" fw = {500}>
                                    OPEN
                                </Text >
                            </Button>
                            <Button h = {50} radius = "xs" ml = {15} mr = {15} mb = {20} w = "88%" justify = "left" variant = "filled" color = "gray">
                                <Image mt = {11} style={{alignSelf: 'flex-start' }} fit= "contain" radius = "md" h = {25} src = {placeholder} alt = "Placeholder" />
                                <Text ml = {10} c = "white" size = "sm" fw = {500}>
                                    UNREVIEWED
                                </Text>
                            </Button>
                            <Button h = {50} radius = "xs" ml = {15} mr = {15} mb = {20} w = "88%" justify = "left" variant = "filled" color = "gray">
                                <Image mt = {11} style={{alignSelf: 'flex-start' }} fit= "contain" radius = "md" h = {25} src = {placeholder} alt = "Placeholder" />
                                <Text ml = {10} c = "white" size = "sm" fw = {500}>
                                    APPROVED
                                </Text>
                            </Button>
                        </Flex>

                        {/* Section with graph*/}
                        <Flex wrap = "nowrap" direction = "column" justify = "space-evenly" bg = "white" mt = {10} w = {500} mr = "10%" h = {400}>
                            {/* Graph, TBA */}
                            <Flex h = {250} mb = {20}>
                            </Flex>

                            <Flex style = {{margin: 10, gap: 10, justifyContent: 'center', alignItems: "flex-end"}}>
                                <Button size = "lg" radius = "xs" color = "gray">
                                    <Text size = "xs">
                                        Last Year
                                    </Text>
                                    
                                </Button>
                                <Button size = "lg" radius = "xs" color = "gray">
                                    <Text size = "xs">
                                        Last 6 Months
                                    </Text>
                                </Button>
                                <Button size = "lg" radius = "xs" color = "gray">
                                    <Text size = "xs">
                                        Last Month
                                    </Text>
                                </Button>
                            </Flex>  
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    ); 
}

export default Dashboard;