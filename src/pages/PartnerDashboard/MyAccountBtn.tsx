import React from "react";
import { Card, Container, Stack, Text, Title, Image, Flex } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

function MyAccountBtn() {
    return (
        <Card w={"100%"} bg={"gray"} component="button" p="xl">
            <Container>
                <IconUserCircle size={"5rem"} color={"white"} />
                <Text c={"white"}>My Account</Text>
            </Container>
        </Card>
    );
}

export default MyAccountBtn;
