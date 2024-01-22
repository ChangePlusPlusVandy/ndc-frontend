import React from 'react';
import { Button, Text, Title, Image, Flex } from '@mantine/core';
import placeholder from '../../assets/placeholder.png';

interface MakeOrderButtonProps {
    handleOnClick: () => void;
}

const MakeOrderBtn: React.FC<MakeOrderButtonProps> = ({ handleOnClick }) => {
    return (
        <Button onClick={handleOnClick} radius="xs" variant="filled" color="gray" size="md" h={70}>
            <Flex direction="column" justify="center" align="center">
                <Image mt={2} h={20} w={20} src={placeholder} alt="Placeholder" />
                <Text fw={500}>
                    Make Order
                </Text>
            </Flex>

        </Button>
    );
};

export default MakeOrderBtn;
