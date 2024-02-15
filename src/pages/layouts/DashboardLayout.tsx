import { AppShell, Burger, Group, Skeleton, Image, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../../assets/logo-horizontal.png';
import UserThumb from '../../assets/Images/StaffImages/UserThumb.png';
import "./DashboardLayout.css"

export default function DashboardLayout() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify='space-between'>
                    <Group h="100%">
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    </Group>
                    <Image className="ndc-logo" src={Logo} alt="Logo" />
                    <Link to="/profile">Account</Link>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Stack>
                    <img src={UserThumb} alt="User pic" className="navbar-profile-pic" />
                    <Link className="nav-button" to="/profile">Account</Link>
                    <Link className="nav-button" to="/">Dashboard</Link>
                    <Link className="nav-button" to="/order-manage">Order Management</Link>
                    <Link className="nav-button" to="/order-info">Orders</Link>
                </Stack>
            </AppShell.Navbar>
            <AppShell.Main><Outlet /></AppShell.Main>
        </AppShell>
    );
}
