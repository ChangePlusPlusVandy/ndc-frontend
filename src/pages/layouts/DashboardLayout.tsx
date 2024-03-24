import { AppShell, Burger, Button, Group, Image, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IconStarFilled, IconSettings, IconUserCircle, IconUsers, IconHome } from '@tabler/icons-react';
import Logo from '../../assets/logo-horizontal.png';
import UserThumb from '../../assets/Images/StaffImages/UserThumb.png';
import "./DashboardLayout.css"
import { useAuth } from '../../AuthContext';

export default function DashboardLayout() {
    const { isStaff } = useAuth();
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

    return (
        <AppShell
            header={{ height: 50 }}
            navbar={{
                width: 205,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Header style={{ backgroundColor: "var(--primary-color)" }}>
                <Group h="100%" px="md">
                    <Group h="100%">
                        <Burger color="white" opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger color="white" opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    </Group>
                    <Image className="ndc-logo" src={Logo} alt="Logo" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md" style={{ backgroundColor: "var(--highlight-color)" }}>
                <Stack gap={2}>
                    <Link to="/">
                        <button className='nav-button'>
                            <IconStarFilled size={19} />
                            <Text>Dashboard</Text>
                        </button>
                    </Link>
                    {isStaff ?
                        <Link to="/order-manage">
                            <button className='nav-button'>
                                <IconSettings size={20} />
                                <Text>Order Management</Text>
                            </button>
                        </Link> 
                        :
                        <>
                            <Link to="/order-info">
                                <button className='nav-button'>
                                    <IconSettings size={20} />
                                    <Text>Orders</Text>
                                </button>
                            </Link>
                            <Link to="/user-dir">
                                <button className='nav-button'>
                                    <IconHome size={20} />
                                    <Text>Partner Directory</Text>
                                </button>
                            </Link> 
                        </>
                         }

                    <Link to="/profile">
                        <button className='nav-button'>
                            <IconUserCircle size={20} />
                            <Text>Profile</Text>
                        </button>
                    </Link>


                    {isStaff &&
                        <Link to="/register">
                            <button className='nav-button'>
                                <IconUsers size={20} />
                                <Text>Manage Staff</Text>
                            </button></Link>
                    }
                </Stack>
            </AppShell.Navbar>
            <AppShell.Main><Outlet /></AppShell.Main>
        </AppShell>
    );
}
