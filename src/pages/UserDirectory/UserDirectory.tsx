import React, {useEffect, useState} from "react";
import { useAuth } from "../../AuthContext";
import {Stack, Button, Group} from "@mantine/core";
import Partner from "./PartnerClass";
import Staff from "./StaffClass"; 
import User from "./UserClass"; 
import UserTable from "./UserTable";
import UserSorter from "./UserSorter"; 
import SearchBar from "./Searchbar";

interface PartnerResponse {
    firstName: string;
    lastName: string;
    type: string; 
    phoneNumber: string; 
    email: string; 
    numOrdersTotal: number; 
    location: string; 
    address: string;  
}

interface StaffResponse {
    firstName: string; 
    lastName: string; 
    phoneNumber: string; 
    email: string; 
}

const UserDirectory: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); 
    const [shownUsers, setShownUsers] = useState<User[]>([]); 
    const [showPartners, setShowPartners] = useState(true); 
    const [showStaff, setShowStaff] = useState(true);
    const [searchVal, setSearchVal] = useState(""); 
    const { currentUser } = useAuth();

    useEffect(() => {
        const getUsers = async () => {
            const token = await currentUser?.getIdToken();

            let resPartners = await fetch(`${import.meta.env.VITE_BACKEND_URL}/partner`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            let dataPartners = (await resPartners.json()).map((elem: PartnerResponse) => {
                return new Partner(
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

            let resStaff = await fetch(`${import.meta.env.VITE_BACKEND_URL}/staff`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            let dataStaff = (await resStaff.json()).map((elem: StaffResponse) => {
                return new Staff(
                    elem.firstName, 
                    elem.lastName, 
                    elem.phoneNumber, 
                    elem.email
                )
            });

            let dataUsers = dataPartners.concat(dataStaff); 
            setUsers(dataUsers); 
            setShownUsers(dataUsers); 
        }

        getUsers();  
    }, []); 

    const filterUsers = (staffCheck: boolean, partnerCheck: boolean) => {
        let userCopy: User[] = []; 
        users.forEach((user: User) => {
            if ((user instanceof Partner && partnerCheck) || (user instanceof Staff && staffCheck)) {
                userCopy.push(user); 
            }
        })

        setShownUsers(userCopy); 
    }

    const toggleShowStaff = () => {
        setShowStaff(!showStaff); 
        filterUsers(!showStaff, showPartners); 
    }

    const toggleShowPartners = () => {
        setShowPartners(!showPartners); 
        filterUsers(showStaff, !showPartners); 
    }

    const searchFunc = (value: string) => {
        setSearchVal(value); 

        let partnerCopy: User[] = []; 
        const valueLower = value.toLowerCase(); 

        users.forEach((user: User) => {
            if (((user instanceof Partner && showPartners) || (user instanceof Staff && showStaff)) && 
            (user.firstName.toLowerCase().includes(valueLower) || user.lastName.toLowerCase().includes(valueLower))) {
                partnerCopy.push(user); 
            }
        })

        setShownUsers(partnerCopy); 
    }

    return (
        <Stack className="width-90">
            <Group justify="space-between">
                <h1>User Directory</h1>
                <Button className="right-align">Create User</Button>
            </Group>
            <Group justify="space-between">
                <Group>
                    <SearchBar searchVal={searchVal} searchFunc={searchFunc}></SearchBar>
                    <Button onClick={toggleShowStaff}>Staff</Button>
                    <Button onClick={toggleShowPartners}>Partners</Button>
                </Group>
                
                <UserSorter users={shownUsers} setUsers={setShownUsers} whichSorters={["Name", "Reverse"]} classes=""></UserSorter>
            </Group>
            <UserTable users={shownUsers}></UserTable>
        </Stack>
        
    ); 
}

export default UserDirectory; 

