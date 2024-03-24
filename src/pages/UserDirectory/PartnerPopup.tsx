import React from "react"; 
import {Modal, Text, Stack, Flex} from "@mantine/core"; 
import { useDisclosure } from "@mantine/hooks";
import Partner from "./PartnerClass";

interface PopupProps {
    children: React.ReactNode; 
    partner: Partner; 
    classNames: string; 
}

const PartnerPopup: React.FC<PopupProps> = ({children, partner, classNames} : PopupProps) => {
    const [opened, {open, close}] = useDisclosure(false); 
    
    return (
        <>
            <div className={classNames} onClick={open}>{children}</div>
            <Modal opened={opened} onClose={close} title={partner.firstName + " " + partner.lastName} centered>
                 <Stack gap={"sm"}>
                    <Flex gap={"xs"} direction={"column"} align="flex-end">
                        <Text className="left-align">
                            Contact Information:
                        </Text>
                        <Text>
                            phone number: {partner.phoneNumber}
                        </Text>
                        <Text>
                            email: {partner.email}
                        </Text>
                    </Flex>
                    <Flex gap={"xs"} direction={"column"} align="flex-end">
                        <Text className="left-align">
                            Other Information:
                        </Text>
                        <Text>
                            type: {partner.type}
                        </Text>
                        <Text>
                            location: {partner.location}
                        </Text>
                        <Text>
                            address: {partner.address}
                        </Text>
                    </Flex>
                    
                    <Text>
                        total orders: {partner.numOrdersTotal}
                    </Text>
                 </Stack>
                 
                 
            </Modal>
        </>
    )
}

export default PartnerPopup; 