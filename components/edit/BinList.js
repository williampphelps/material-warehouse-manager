import { Container, Paper, List, ListItemButton, ListItemText, ListItemIcon, Divider, Box } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocationAlt';
import useSWR, { useSWRConfig } from 'swr';
import NextLink from 'next/link';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function BinList() {
    const { data } = useSWR('/api/bins/', fetcher,);

    if (!data) {
        return (
            <Paper elevation={1} sx={{ my: 2 }}>
                <p>Loading...</p>
            </Paper>
        )
    }
    return (
        <Paper elevation={1} sx={{ my: 2 }}>
            <List>
                {data.data.map((value, index) => {
                    let active = <Box sx={{ color: 'error.main' }}><small>Inactive</small></Box>
                    if (value.active) {
                        active = <Box sx={{ color: 'success.main' }}><small>Active</small></Box>
                    }
                    let binLink = "/inventory/edit/bin/" + value._id;
                    return (
                        <NextLink href={binLink} key={value._id}><ListItemButton>
                            <ListItemText primary={value.name} secondary={active} />
                        </ListItemButton></NextLink>
                    )
                })}
            </List>
        </Paper>
    )
}
