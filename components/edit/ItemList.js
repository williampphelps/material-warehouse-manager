import { Container, Paper, List, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocationAlt';
import AddIcon from '@mui/icons-material/Add';
import useSWR, { useSWRConfig } from 'swr';
import NextLink from 'next/link';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ItemList(props) {
    const { data } = useSWR('/api/products/', fetcher,);

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
                    let modelString = value.model + " | " + value.type;
                    if (!value.model && !value.type) {
                        modelString = "Miscellaneous";
                    }
                    if (!value.model && value.type) {
                        modelString = value.type;
                    }
                    if (!value.type && value.model) {
                        modelString = value.model;
                    }
                    let itemLink = "/inventory/edit/product/" + value._id
                    return (
                        <NextLink href={itemLink}><ListItemButton>
                            <ListItemText primary={value.name} secondary={modelString} />
                        </ListItemButton></NextLink>
                    )
                })}
            </List>
        </Paper>
    )
}
