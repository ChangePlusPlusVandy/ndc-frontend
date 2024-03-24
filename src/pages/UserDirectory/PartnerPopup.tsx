import React from "react"; 
import Partner from "./PartnerClass";

interface PopupProps {
    children: React.ReactNode; 
    partner: Partner; 
    classNames: string; 
}

const PartnerPopup: React.FC<PopupProps> = ({children, partner, classNames} : PopupProps) => {
    return (
        <>
            <div className={classNames}>{children}</div>
        </>
    )
}

export default PartnerPopup; 