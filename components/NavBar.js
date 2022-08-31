import Paper from '@mui/material/Paper';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlagIcon from '@mui/icons-material/Flag';
import PersonIcon from '@mui/icons-material/Person';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function NavBar(props) {
    const router = useRouter();
    const { data: session } = useSession();
    const [value, setValue] = useState(props.currentPage);
    const [userData, setUserData] = useState({});

    const bottomNavLinks = ["/", "/assignments/", "/forms/"];

    const handleChange = async (e, newValue) => {
        setValue(newValue);
        router.push(bottomNavLinks[newValue])
    }

    if (session) {
        const fullUserName = session.user.fname + " " + session.user.lname;
        return (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels value={value} onChange={handleChange} >
                    <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
                    <BottomNavigationAction label="Assignments" icon={<AssignmentIcon />} />
                    <BottomNavigationAction label="Forms" icon={<FlagIcon />} />
                    <BottomNavigationAction onClick={() => signOut()} label={fullUserName} icon={<PersonIcon />} />
                </BottomNavigation>
            </Paper>
        )
    }


}
