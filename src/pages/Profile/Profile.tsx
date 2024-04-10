import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
    Title,
    Text,
    Flex,
    Grid,
    Button,
    TextInput,
    Indicator,
    Avatar,
} from "@mantine/core";
import { useAuth } from "../../AuthContext";
import { IconPencil } from "@tabler/icons-react";
import Staff from "./StaffClass";
import Partner from "./PartnerClass";
import User from "./UserClass";

const Profile: React.FC = () => {
    const { mongoId, currentUser, logout, getUser, isStaff } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editing, setEditing] = useState<boolean>(false);
    const [email, setEmail] = useState<string | undefined>("");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
    const [address, setAddress] = useState<string | undefined>("");
    const [deliveryInstructions, setDeliveryInstructions] = useState<
        string | undefined
    >("");

    useEffect(() => {
        const getUsers = async () => {
            const token = await currentUser?.getIdToken();
            console.log(isStaff);
            if (isStaff) {
                let resStaff = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/staff?id=${mongoId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                let dataStaff = await resStaff.json();
                console.log(dataStaff);
                console.log("staff");
                let newUser = new Staff(
                    dataStaff.firstName,
                    dataStaff.lastName,
                    dataStaff.phoneNumber,
                    dataStaff.email
                );
                setUser(newUser);
                setEmail(newUser.email);
                setPhoneNumber(newUser.phoneNumber);
            } else {
                let resPartner = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/partner?id=${mongoId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                let dataPartner = await resPartner.json();
                console.log(dataPartner);
                let newUser = new Partner(
                    dataPartner.firstName,
                    dataPartner.lastName,
                    dataPartner.type,
                    dataPartner.phoneNumber,
                    dataPartner.email,
                    dataPartner.numOrdersTotal,
                    dataPartner.location,
                    dataPartner.address,
                    dataPartner.deliveryInstructions
                );
                setUser(newUser);
                setEmail(newUser.email);
                setPhoneNumber(newUser.phoneNumber);
                if (newUser instanceof Partner) {
                    setAddress(newUser.address);
                    setDeliveryInstructions(newUser.deliveryInstructions);
                }
            }

            setIsLoading(false);
        };

        getUsers();
    }, []);

    const handleLogout = () => {
        void logout();
        navigate("/login");
    };

    const handleSave = async () => {
        setEditing(false);
        try {
            const token = await currentUser?.getIdToken();
            if (isStaff) {
                const staff = JSON.stringify({
                    phoneNumber: phoneNumber,
                    email: email,
                });

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/staff?id=${mongoId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: staff,
                    }
                );
                console.log(response);
            } else {
                const partner = JSON.stringify({
                    id: mongoId,
                    phoneNumber: phoneNumber,
                    email: email,
                    deliveryInstructions: deliveryInstructions,
                    address: address
                })
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/partner?id=${mongoId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: partner,
                    }
                );
                console.log(response);
            }

        } catch (error) {
            console.log("ERROR " + error);
        }
    };

    /*<div>
      <h1>Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {user?.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Is a Staff Member:</strong> {isStaff ? "yes" : "no"}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      </div>*/

    return (
        <>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Flex
                        p="lg"
                        wrap="wrap"
                        justify="space-between"
                        align="center"
                    >
                        <Title>Profile</Title>
                        <Flex justify="end" gap="md">
                            {editing ? (
                                <Button
                                    radius="0.5rem"
                                    size="md"
                                    color="var(--primary-color)"
                                    onClick={handleSave}
                                >
                                    <Text c={"var(--light-color)"}>Save</Text>
                                </Button>
                            ) : (
                                <Button
                                    radius="0.5rem"
                                    size="md"
                                    color="var(--primary-color)"
                                    onClick={() => setEditing(true)}
                                >
                                    <Text c={"var(--light-color)"}>Edit</Text>
                                </Button>
                            )}

                            <Button
                                radius="0.5rem"
                                size="md"
                                color="var(--primary-color)"
                                onClick={handleLogout}
                            >
                                <Text c={"var(--light-color)"}>Log Out</Text>
                            </Button>
                        </Flex>
                    </Flex>

                    <Grid
                        p="lg"
                        grow
                        gutter="md"
                        justify="center"
                        align="stretch"
                    >
                        <Grid.Col className="grid-col" span={{ base: 6 }}>
                            <Flex
                                justify="space-between"
                                flex="1"
                                className="dashboard-box"
                                p="md"
                                direction="column"
                            >
                                <Text className="mantine-Subtitle-root">
                                    Personal Info
                                </Text>
                                <Flex justify="center">
                                    <Indicator
                                        offset={20}
                                        inline
                                        label={
                                            <IconPencil className="square-icon" />
                                        }
                                        color="var(--primary-color)"
                                        position="bottom-end"
                                        size={40}
                                    >
                                        <Avatar
                                            size="7rem"
                                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                        />
                                    </Indicator>
                                </Flex>

                                <Flex
                                    direction="column"
                                    gap="md"
                                    justify="space-between"
                                >
                                    <Flex direction="column" gap="0">
                                        <Text size="sm" fw="bold">
                                            Organization Name
                                        </Text>
                                        <Text>
                                            {user instanceof Partner
                                                ? user?.location
                                                : "Nashville Diaper Connection"}
                                        </Text>
                                    </Flex>
                                    <Flex direction="column" gap="0">
                                        <Text size="sm" fw="bold">
                                            First Name
                                        </Text>
                                        <Text>{String(user?.firstName)}</Text>
                                    </Flex>
                                    <Flex direction="column" gap="0">
                                        <Text size="sm" fw="bold">
                                            Last Name
                                        </Text>

                                        <Text>{String(user?.lastName)}</Text>
                                    </Flex>
                                    {editing ? (
                                        <>
                                            <TextInput
                                                label="Email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <TextInput
                                                label="Phone Number"
                                                value={phoneNumber}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Flex direction="column" gap="0">
                                                <Text size="sm" fw="bold">
                                                    Email
                                                </Text>

                                                <Text>{email}</Text>
                                            </Flex>
                                            <Flex direction="column" gap="0">
                                                <Text size="sm" fw="bold">
                                                    Phone Number
                                                </Text>

                                                <Text>{phoneNumber}</Text>
                                            </Flex>
                                        </>
                                    )}
                                </Flex>
                            </Flex>
                        </Grid.Col>

                        <Grid.Col className="grid-col" span={{ base: 6 }}>
                            <Flex
                                justify="stretch"
                                gap="md"
                                p="0"
                                flex="1"
                                direction={{
                                    base: "column",
                                    xs: "row",
                                    sm: "column",
                                }}
                                align="stretch"
                            >
                                <Flex
                                    flex="1"
                                    justify="space-between"
                                    p="md"
                                    gap="md"
                                    direction="column"
                                    className="dashboard-box"
                                >
                                    <Text className="mantine-Subtitle-root">
                                        Address
                                    </Text>

                                    <Flex
                                        direction="column"
                                        gap="md"
                                        justify="space-between"
                                        flex="1"
                                    >
                                        <Flex direction="column" gap="0">
                                            <Text size="sm" fw="bold">
                                                Street Address
                                            </Text>
                                            {user instanceof Partner ? (
                                                editing ? (
                                                    <TextInput
                                                        value={address}
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <Text>{address}</Text>
                                                )
                                            ) : (
                                                <Text>
                                                    Nashville Diaper Connection
                                                </Text>
                                            )}
                                        </Flex>

                                        <Flex direction="column" gap="0">
                                            <Text size="sm" fw="bold">
                                                Delivery Instructions
                                            </Text>
                                            {user instanceof Partner &&
                                                (editing ? (
                                                    <TextInput
                                                        value={
                                                            deliveryInstructions
                                                        }
                                                        onChange={(e) =>
                                                            setDeliveryInstructions(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <Text>
                                                        {deliveryInstructions}
                                                    </Text>
                                                ))}
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex
                                    flex="1"
                                    justify="space-between"
                                    p="md"
                                    gap="md"
                                    direction="column"
                                    className="dashboard-box"
                                >
                                    <Text className="mantine-Subtitle-root">
                                        Password
                                    </Text>
                                    <Flex
                                        direction="column"
                                        gap="md"
                                        justify="space-between"
                                        flex="1"
                                    >
                                        <TextInput
                                            label="Current Password"
                                            placeholder={String()}
                                        />
                                        <TextInput label="New Password" />
                                        <TextInput label="Confirm Password" />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </>
            )}
        </>
    );
};

export default Profile;
