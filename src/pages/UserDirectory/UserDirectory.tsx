import React, {useEffect, useState} from "react";
import { useAuth } from "../../AuthContext";
import Partner from "./PartnerClass";
import PartnerTable from "./PartnerTable";
import PartnerSorter from "./PartnerSorter"

interface PartnerResponse {
    _id: string;
    firstName: string;
    lastName: string;
    type: string; 
    phoneNumber: string; 
    email: string; 
    numOrdersTotal: number; 
    location: string; 
    address: string;  
}

const UserDirectory: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]); 
    const { currentUser } = useAuth();

    useEffect(() => {
        const getPartners = async () => {
            const token = await currentUser?.getIdToken();

            let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/partner`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            let data = (await res.json()).map((elem: PartnerResponse) => {
                return new Partner(
                    elem._id, 
                    elem.firstName, 
                    elem.lastName, 
                    elem.type, 
                    elem.phoneNumber, 
                    elem.email, 
                    elem.numOrdersTotal, 
                    elem.location, 
                    elem.address
                )
            });
            setPartners(data); 
        }

        getPartners(); 
    }, [])

    return (
        <>
            <h1>Partner Directory</h1>
            <PartnerSorter partners={partners} setPartners={setPartners} whichSorters={["Name", "Reverse"]} classes=""></PartnerSorter>
            <PartnerTable partners={partners}></PartnerTable>
        </>
        
    ); 
}

export default UserDirectory; 

