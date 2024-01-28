import React from "react";
import { Card, Container, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

type MyAccountButtonProps = {
    onClick: any;
};

const MyAccountBtn: React.FC<MyAccountButtonProps> = ({ onClick }) => {
    return (
        <Card w={"100%"} bg={"gray"} component="button" p="xl" onClick={onClick}>
            <Container>
                <IconUserCircle size={"5rem"} color={"white"} />
                <Text c={"white"}>My Account</Text>
            </Container>
        </Card>
    );
}

export default MyAccountBtn;
