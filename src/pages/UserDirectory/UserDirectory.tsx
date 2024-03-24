import React, {useEffect, useState} from "react";
import { useAuth } from "../../AuthContext";
import {Button, Group, Autocomplete} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Partner from "./PartnerClass";
import PartnerTable from "./PartnerTable";
import PartnerSorter from "./PartnerSorter"; 
import SearchBar from "./Searchbar";

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
    const [shownPartners, setShownPartners] = useState<Partner[]>([]); 
    const [searchVal, setSearchVal] = useState(""); 
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
            setShownPartners(data);  
        }

        getPartners(); 
    }, [])

    const searchFunc = (value: string) => {
        setSearchVal(value); 

        let partnerCopy: Partner[] = []; 
        const valueLower = value.toLowerCase(); 

        partners.forEach((partner: Partner) => {
            if (partner.firstName.toLowerCase().includes(valueLower) || partner.lastName.toLowerCase().includes(valueLower)) {
                partnerCopy.push(partner); 
            }
        })

        setShownPartners(partnerCopy); 
    }

    return (
        <>
            <h1>Partner Directory</h1>
            <Group justify="space-between">
                <PartnerSorter partners={partners} setPartners={setPartners} whichSorters={["Name", "Reverse"]} classes=""></PartnerSorter>
                <SearchBar searchVal={searchVal} searchFunc={searchFunc}></SearchBar>
            </Group>
            <PartnerTable partners={shownPartners}></PartnerTable>
            <Button>Create Partner</Button>
        </>
        
    ); 
}

export default UserDirectory; 

