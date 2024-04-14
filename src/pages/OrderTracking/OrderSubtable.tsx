import React, {useState} from "react"
import Order from "./OrderClass"
import { ActionIcon, Table, Flex, Checkbox } from "@mantine/core"
import OrderPopup from "../OrderPopup"
import { IconPencil, IconCircle } from "@tabler/icons-react"
import { useAuth } from "../../AuthContext"


interface SubtableProps {
    order: Order, 
    index: number 
}

const OrderSubtable : React.FC<SubtableProps> = ({order, index} : SubtableProps) => {
    const { mongoId, currentUser } = useAuth();
    const [status, setStatus] = useState(order.status); 

    const standardCase = (s: string) => {
        return s[0]?.toUpperCase() + s.substring(1).toLowerCase();
    };

    const handleStatusName = (status: string) => {
        switch (status) {
            case "OPEN":
            case "PLACED":
                return "Unreviewed";
            case "APPROVED":
                return "In progress";
            default:
                return status;
        }
    };

    const handleStatusChange = async (order: Order, index: number) => {
        const token = await currentUser?.getIdToken();
        const body = {
            "orderId": order.id, 
            "status": "FILLED",
            "numDiapers": order.numDiapers, 
            "newborn": order.diaperDist[0], 
            "size1": order.diaperDist[1], 
            "size2": order.diaperDist[2],  
            "size3": order.diaperDist[3], 
            "size4": order.diaperDist[4],  
            "size5": order.diaperDist[5], 
            "size6": order.diaperDist[6], 
        } 
        let res = await fetch(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/order?partnerId=${mongoId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            }
        );
        
        setStatus("FILLED"); 
    }
    
    return (
        <Table.Tr key={index}>
            <Table.Td>
                <OrderPopup order={order}>
                    <ActionIcon
                        variant="filled"
                        color="var(--primary-color)"
                        radius="xl"
                        aria-label="Edit Order"
                    >
                        <IconPencil
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </OrderPopup>
            </Table.Td>
            <Table.Td ta="center">{index + 1}</Table.Td>
            <Table.Td ta="center">{order.location}</Table.Td>
            <Table.Td ta="center">{order.datePlaced.toDateString()}</Table.Td>
            <Table.Td ta="end">{order.numDiapers}</Table.Td>
            <Table.Td>
                <Flex justify="center" gap="sm" align={"center"}>
                    <Flex
                        className={
                            "status-badge " +
                            (status == "PLACED"
                                ? "open"
                                : status.toLowerCase())
                        }
                        px="lg"
                        justify="center"
                        gap="md"
                        align="center"
                        p="xs"
                    >
                        <IconCircle
                            className={
                                (status == "PLACED"
                                    ? "open"
                                    : status.toLowerCase()) + "-dot"
                            }
                            size=".75rem"
                        />
                        {standardCase(handleStatusName(status))}
                    </Flex>
                </Flex>
            </Table.Td>
            <Table.Td ta="center">
                {status == "FILLED" ? 
                <Checkbox color="gray" defaultChecked disabled></Checkbox> : 
                <Checkbox color="gray" onChange={() => {handleStatusChange(order, index)}}></Checkbox>
                }
                
            </Table.Td>
        </Table.Tr>
    )
        
        
}

export default OrderSubtable