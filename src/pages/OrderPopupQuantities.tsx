import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Modal } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

const OrderPopupQuantities: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                idk


                
            </Modal>

            <ActionIcon className="quantity-button" variant="light" color="gray" aria-label="Settings" onClick={open}>
                <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>



        
        </>
    );
};

export default OrderPopupQuantities;