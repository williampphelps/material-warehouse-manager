import NextLink from 'next/link';
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
import ArchiveIcon from '@mui/icons-material/Archive';

export default function AdminInventoryMenuItems() {
    return (
        <>
            <NextLink href="/inventory/setup/"><ListItemButton>
                <ListItemIcon><ArchiveIcon /></ListItemIcon>
                <ListItemText primary="Recieving" />
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
        </>
    )
}
