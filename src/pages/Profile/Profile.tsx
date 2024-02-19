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

type User = {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
};

const Profile: React.FC = () => {
    const { logout, getUser, isStaff } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const currentUser = getUser();

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
            setIsLoading(false);
        }
    }, [currentUser]);

    const handleLogout = () => {
        void logout();
        navigate("/login");
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
                        <Button
                            radius="0.5rem"
                            size="md"
                            color="var(--primary-color)"
                            onClick={handleLogout}
                        >
                            <Flex gap="md">
                                <Text c={"var(--light-color)"}>Log Out</Text>
                            </Flex>
                        </Button>
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
                                    <TextInput
                                        label="Organization Name"
                                        placeholder=""
                                    />
                                    <TextInput
                                        label="First Name"
                                        placeholder={String(user?.displayName)}
                                    />
                                    <TextInput
                                        label="Last Name"
                                        placeholder={String(user?.displayName)}
                                    />
                                    <TextInput
                                        label="Email"
                                        placeholder={String(user?.email)}
                                    />
                                    <TextInput
                                        label="Phone"
                                        placeholder={String(user?.phoneNumber)}
                                    />
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
                                        <TextInput
                                            label="Street Address"
                                            placeholder=""
                                        />
                                        <TextInput
                                            label="Delivery Instructions"
                                            placeholder={String(
                                                user?.displayName
                                            )}
                                        />
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
                                            placeholder={String(
                                                user?.displayName
                                            )}
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
