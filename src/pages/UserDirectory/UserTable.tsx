import React from "react"; 
import {Grid, Text, Avatar, Flex} from "@mantine/core"; 
import User from "./UserClass";
import UserPopup from "./UserPopup";
import "../../styles/UserDirectory.css"

interface TableProps {
    users: User[]; 
}

const UserTable: React.FC<TableProps> = ({users} : TableProps) => {
    return (
        <Grid>
            {users?.map((elem: User, index: number)=> {
                return (
                    <Grid.Col  span={4} key={index}>
                        <UserPopup user={elem} classNames="partnerBox">
                            <Flex direction={"row"} gap={"lg"}>
                                <Avatar
                                    size="7rem"
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                />
                                <Text>{elem.firstName + " " + elem.lastName}</Text>
                            </Flex>
                                
                        </UserPopup>
                    </Grid.Col>
                )
            })}
        </Grid>
    )
}

export default UserTable; 