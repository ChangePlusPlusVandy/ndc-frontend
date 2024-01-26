import React, { useEffect, useState } from "react";
import { Title } from "@mantine/core";
import { useAuth } from "../../AuthContext";
import { User } from "firebase/auth";

function Greeting() {
    const { getUser } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const currentUser = getUser();

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser]);
    return (
        <Title c="black" ta={"center"}>
            Hello, {user?.displayName}
        </Title>
    );
}

export default Greeting;
