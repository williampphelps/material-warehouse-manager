import Paper from '@mui/material/Paper';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlagIcon from '@mui/icons-material/Flag';

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function NavBar(props) {
    const router = useRouter();
    const [value, setValue] = useState(props.currentPage);
    const bottomNavLinks = ["/", "/inventory/", "/assignments/", "/forms/"];

    const handleChange = async (e, newValue) => {
        setValue(newValue);
        router.push(bottomNavLinks[newValue])
    }
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels value={value} onChange={handleChange} >
                <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
                <BottomNavigationAction label="Inventory" icon={<InventoryIcon />} />
                <BottomNavigationAction label="Assignments" icon={<AssignmentIcon />} />
                <BottomNavigationAction label="Forms" icon={<FlagIcon />} />
            </BottomNavigation>
        </Paper>
    )
}
