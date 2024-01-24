import React from "react";
import { Card, Container, Text, Title, Image, Flex } from "@mantine/core";
import { IconListSearch } from "@tabler/icons-react";

interface ViewOrderButtonProps {
    onClick: () => void;
}

const ViewOrderBtn: React.FC<ViewOrderButtonProps> = ({ onClick }) => {
    return (
        <Card w={"100%"} bg={"gray"} component="button" p="xl" onClick={onClick}>
            <Container>
                <IconListSearch size={"5rem"} color={"white"} />
                <Text c={"white"}>View Order</Text>
            </Container>
        </Card>
    );
};

export default ViewOrderBtn;
