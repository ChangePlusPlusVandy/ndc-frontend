import React from "react";
import {
    Button,
    Container,
    Text,
    Stack,
    Title,
    Image,
    Flex,
    Paper,
    Card
} from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons-react";

interface MakeOrderButtonProps {
    handleOnClick: () => void;
}

const MakeOrderBtn: React.FC<MakeOrderButtonProps> = ({ handleOnClick }) => {
    return (
        <Card w={"100%"} bg={"gray"} component="button" p="xl" onClick={handleOnClick}>
            <Container>
                <IconSquarePlus size={"5rem"} color={"white"} />
                <Text c={"white"}>Make Order</Text>
            </Container>
        </Card>
    );
};

export default MakeOrderBtn;
