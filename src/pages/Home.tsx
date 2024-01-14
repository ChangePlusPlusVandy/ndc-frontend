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
        const res = await fetch("/api/inventory/", payloadHeader);
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
      <div>
        <h2>wrapped:</h2>
        <h4>newborn: {inventory?.wrapped.newborn} </h4>
        <h4>size1: {inventory?.wrapped.size1}</h4>
        <h4>size2: {inventory?.wrapped.size2}</h4>
        <h4>size3: {inventory?.wrapped.size3}</h4>
        <h4>size4: {inventory?.wrapped.size4}</h4>
        <h4>size5: {inventory?.wrapped.size5}</h4>
        <h4>size6: {inventory?.wrapped.size6}</h4>
      </div>
      <div>
        <h2>Unwrapped: </h2>
        <h4>newborn: {inventory?.unwrapped.newborn}</h4>
        <h4>size1: {inventory?.unwrapped.size1}</h4>
        <h4>size2: {inventory?.unwrapped.size2}</h4>
        <h4>size3: {inventory?.unwrapped.size3}</h4>
        <h4>size4: {inventory?.unwrapped.size4}</h4>
        <h4>size5: {inventory?.unwrapped.size5}</h4>
        <h4>size6: {inventory?.unwrapped.size6}</h4>
      </div>
      <br />
      <Link to="/profile">Profile</Link>
    </div>

  );
};

export default Home;
