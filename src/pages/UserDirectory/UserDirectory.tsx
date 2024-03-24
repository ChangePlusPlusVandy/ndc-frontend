import React, {useEffect, useState} from "react";
import { useAuth } from "../../AuthContext";
import {Button, Group} from "@mantine/core";
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
    const [showPartners, setShowPartners] = useState(false); 
    const [showStaff, setShowStaff] = useState(false);
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

    const filterUsers = () => {
        let userCopy: User[] = []; 
        users.forEach((user: User) => {
            if ((user instanceof Partner && showPartners) || (user instanceof Staff && showStaff)) {
                userCopy.push(user); 
            }
        })

        setShownUsers(userCopy); 
    }

    const toggleShowStaff = () => {
        setShowStaff(!showStaff); 
    }

    const toggleShowPartners = () => {
        setShowPartners(!showPartners); 
        filterUsers(); 
    }

    const searchFunc = (value: string) => {
        setSearchVal(value); 

        let partnerCopy: User[] = []; 
        const valueLower = value.toLowerCase(); 

        users.forEach((user: User) => {
            if (user.firstName.toLowerCase().includes(valueLower) || user.lastName.toLowerCase().includes(valueLower)) {
                partnerCopy.push(user); 
            }
        })

        setShownUsers(partnerCopy); 
    }

    return (
        <>
            <Group justify="space-between">
                <h1>User Directory</h1>
                <Button className="right-align">Create User</Button>
            </Group>
            <Group justify="space-between">
                <Group>
                    <UserSorter users={shownUsers} setUsers={setShownUsers} whichSorters={["Name", "Reverse"]} classes=""></UserSorter>
                    <Button onClick={toggleShowStaff}>Staff</Button>
                    <Button onClick={toggleShowPartners}>Partners</Button>
                </Group>
                
                <SearchBar searchVal={searchVal} searchFunc={searchFunc}></SearchBar>
            </Group>
            <UserTable users={shownUsers}></UserTable>
        </>
        
    ); 
}

export default UserDirectory; 

