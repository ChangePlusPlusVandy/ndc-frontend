import React from "react"; 
import {Grid, Text, Avatar, Flex} from "@mantine/core"; 
import User from "./UserClass";
import Partner from "./PartnerClass";
import UserPopup from "./UserPopup";
import "../../styles/UserDirectory.css"

interface TableProps {
    users: User[]; 
}

const UserTable: React.FC<TableProps> = ({users} : TableProps) => {
    return (
        <Grid className="user-table background-bubble-light-1">
            {users?.map((elem: User, index: number)=> {
                return (
                    <Grid.Col  span={4} key={index}>
                        <UserPopup user={elem} classNames="user-box">
                            <Flex direction={"column"} gap={"lg"} align={"center"}>
                                <Avatar
                                    size="7rem"
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                />
                                <Text>{elem.firstName + " " + elem.lastName}</Text>
                                <Text>{elem.email}</Text>

                                <Text className="type-indicator">{elem instanceof Partner ? "Partner" : "Staff"}</Text>
                            </Flex>
                                
                        </UserPopup>
                    </Grid.Col>
                )
            })}
        </Grid>
    )
}

export default UserTable; 