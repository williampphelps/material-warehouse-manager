import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MoveUpIcon from '@mui/icons-material/MoveUp';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PageviewIcon from '@mui/icons-material/Pageview';
import AddIcon from '@mui/icons-material/Add';
import AddLocationIcon from '@mui/icons-material/AddLocationAlt';
import EditLocationIcon from '@mui/icons-material/EditLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import NavBar from '/components/NavBar';

import { useRouter } from 'next/router';
import NextLink from 'next/link';


import { useState } from 'react';

export default function InventoryPage() {
    const router = useRouter();
    const [value, setValue] = useState(1);
    const bottomNavLinks = ["/", "/inventory/", "/assignments/", "/forms/"];

    const handleBottomNav = async (e, newValue) => {
        setValue(newValue);
        router.push(bottomNavLinks[newValue])
    }

    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container><h1>Manage Inventory</h1></Container>
            </Paper>
            <Paper elevation={1} sx={{ my: 2 }}>
                <List>
                    <NextLink href="/inventory/transfer/"><ListItemButton>
                        <ListItemIcon><MoveUpIcon /></ListItemIcon>
                        <ListItemText primary="Inventory Transfers" />
                    </ListItemButton></NextLink>
                    <NextLink href="/inventory/bins/"><ListItemButton>
                        <ListItemIcon><PageviewIcon /></ListItemIcon>
                        <ListItemText primary="Bin Inquiry" />
                    </ListItemButton></NextLink>
                    <NextLink href="/inventory/items/"><ListItemButton>
                        <ListItemIcon><ManageSearchIcon /></ListItemIcon>
                        <ListItemText primary="Item Lookup" />
                    </ListItemButton></NextLink>
                </List>
            </Paper>
            <Paper elevation={1} sx={{ my: 2 }}>
                <List>
                    <NextLink href="/inventory/setup/"><ListItemButton>
                        <ListItemIcon><SettingsApplicationsIcon /></ListItemIcon>
                        <ListItemText primary="Initial Setup" />
                    </ListItemButton></NextLink>
                    <NextLink href="/inventory/create/bin/"><ListItemButton>
                        <ListItemIcon><AddLocationIcon /></ListItemIcon>
                        <ListItemText primary="New Bin" />
                    </ListItemButton></NextLink>
                    <NextLink href="/inventory/edit/bin/"><ListItemButton>
                        <ListItemIcon><EditLocationIcon /></ListItemIcon>
                        <ListItemText primary="Edit Bin" />
                    </ListItemButton></NextLink>
                    <NextLink href="/inventory/create/product/"><ListItemButton>
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText primary="New Product" />
                    </ListItemButton></NextLink>
                    <NextLink href="/inventory/edit/product/"><ListItemButton>
                        <ListItemIcon><EditIcon /></ListItemIcon>
                        <ListItemText primary="Edit Product" />
                    </ListItemButton></NextLink>
                </List>
            </Paper>
        </Container>
        <NavBar currentPage={1} />
       </>
    )
}
