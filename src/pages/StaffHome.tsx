import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface DiaperSizes {
    newborn: number;
    size1: number;
    size2: number;
    size3: number;
    size4: number;
    size5: number;
    size6: number;
}

interface InventoryApiResponse {
    _id: {
        $oid: string;
    };
    wrapped: DiaperSizes;
    unwrapped: DiaperSizes;
}

const Home: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryApiResponse | null>(null)
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchFact = async () => {
            try {
                const token = await currentUser?.getIdToken();

                const payloadHeader = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                // below, the /api is replaced with the server url defined in vite.config.ts
                // so, if the server is defined as "localhost:3001" in that file,
                // the fetch url will be "localhost:3001/example"
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/inventory/`, payloadHeader);
                const data = await res.json() as InventoryApiResponse;
                setInventory(data);
            } catch (err) {
                console.error(err);
            }
        };
        if (currentUser) {
            void fetchFact();
        }
    }, [currentUser]);



    return (
        <div>
            <h1>You Are a Staff Member</h1>
            <br />
            <Link to="/profile">Profile</Link>
        </div>
    );
};

export default Home;
