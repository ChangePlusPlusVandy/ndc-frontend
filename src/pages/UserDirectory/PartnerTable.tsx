import React from "react"; 
import {Grid, Text, Avatar, Flex} from "@mantine/core"; 
import Partner from "./PartnerClass";
import PartnerPopup from "./PartnerPopup";
import "../../styles/UserDirectory.css"

interface TableProps {
    partners: Partner[]; 
}

const PartnerTable: React.FC<TableProps> = ({partners} : TableProps) => {
    return (
        <Grid>
            {partners?.map((elem: Partner, index: number)=> {
                return (
                    <Grid.Col  span={4} key={index}>
                        <PartnerPopup partner={elem} classNames="partnerBox">
                            <Flex direction={"row"} gap={"lg"}>
                                <Avatar
                                    size="7rem"
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                />
                                <Text>{elem.firstName + " " + elem.lastName}</Text>
                            </Flex>
                                
                        </PartnerPopup>
                    </Grid.Col>
                )
            })}
        </Grid>
    )
}

export default PartnerTable; 