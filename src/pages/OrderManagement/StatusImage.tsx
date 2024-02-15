import React from "react"; 
import {Image} from "@mantine/core"; 



interface StatusImageProps {
    status: string, 
}

const StatusImage: React.FC<StatusImageProps> = ({status}: StatusImageProps) => {
    const statusColor = (status == "CANCELLED" ? "red" : (status == "FILLED" ? "green" : "yellow"));
    
    return (
        <div className={`circle ${statusColor}_circle`}></div>
    )
}

export default StatusImage; 