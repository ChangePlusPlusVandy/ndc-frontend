import React from "react"; 
import {Grid, Text} from "@mantine/core"; 
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
                            <Text>{elem.firstName + " " + elem.lastName}</Text>
                        </PartnerPopup>
                    </Grid.Col>
                )
            })}
        </Grid>
    )
}

export default PartnerTable; 