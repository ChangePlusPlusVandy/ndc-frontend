import React from "react"; 

interface StatusImageProps {
    status: string, 
}

const StatusImage: React.FC<StatusImageProps> = ({status}: StatusImageProps) => {
    const statusColor = (status == "CANCELLED" ? "red" : (status == "PLACED" ? "yellow" : (status == "OPEN" ? "light-green" : "green")));
    
    return (
        <div className={`circle ${statusColor}_circle`}></div>
    )
}

export default StatusImage; 