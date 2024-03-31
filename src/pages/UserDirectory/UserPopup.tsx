import React from "react"; 
import {Modal, Text, Stack, Flex} from "@mantine/core"; 
import { useDisclosure } from "@mantine/hooks";
import Partner from "./PartnerClass";
import User from "./UserClass"; 

interface PopupProps {
    children: React.ReactNode; 
    user: User; 
    classNames: string; 
}

const UserPopup: React.FC<PopupProps> = ({children, user, classNames} : PopupProps) => {
    const [opened, {open, close}] = useDisclosure(false); 
    
    return (
        <>
            <div className={classNames} onClick={open}>{children}</div>
            <Modal opened={opened} onClose={close} title={user.firstName + " " + user.lastName} centered>
                 <Stack gap={"sm"}>
                    <Flex gap={"xs"} direction={"column"} align="flex-end">
                        <Text className="left-align">
                            Contact Information:
                        </Text>
                        <Text>
                            phone number: {user.phoneNumber}
                        </Text>
                        <Text>
                            email: {user.email}
                        </Text>
                    </Flex>
                    {user instanceof Partner && 
                        <>
                            <Flex gap={"xs"} direction={"column"} align="flex-end">
                                <Text className="left-align">
                                    Other Information:
                                </Text>
                                <Text>
                                    type: {user.type}
                                </Text>
                                <Text>
                                    location: {user.location}
                                </Text>
                                <Text>
                                    address: {user.address}
                                </Text>
                            </Flex>
                            
                            <Text>
                                total orders: {user.numOrdersTotal}
                            </Text>
                        </>
                    }
                 </Stack>
                 
                 
            </Modal>
        </>
    )
}

export default UserPopup; 