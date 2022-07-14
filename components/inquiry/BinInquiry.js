import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import BinInquiryDetails from '/components/inquiry/BinInquiryDetails';

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function BinInquiryTable (props) {
    const { data: binData } = useSWR(props.api, fetcher,);

    if (!binData) {
        return (
            <Paper elevation={1} sx={{ my: 2 }}>
                <p>Loading...</p>
            </Paper>
        )
    }
    if (!Array.isArray(binData.data)) {
        let active = <Box sx={{ color: 'error.main' }}><small>Inactive</small></Box>
        if (binData.data.active) {
            active = <Box sx={{ color: 'success.main' }}><small>Active</small></Box>
        }
        return (
            <List sx={{ mx: 2 }}>
                <Stack direction='row' alignItems='center' spacing={3}><h2>{binData.data.name}</h2> {active}</Stack>
                <BinInquiryDetails bin={binData.data._id} />
            </List>
        )
    }
    return (
        <>
            {binData.data.map((value, index) => {
                let active = <Box sx={{ color: 'error.main' }}><small>Inactive</small></Box>
                if (value.active) {
                    active = <Box sx={{ color: 'success.main' }}><small>Active</small></Box>
                }
                return (
                    <List sx={{ mx: 2 }} key={index}>
                        <Stack direction='row' alignItems='center' spacing={3}><h2>{value.name}</h2> {active}</Stack>
                        <BinInquiryDetails bin={value._id} />
                    </List>
                )
            })}
        </>
    )
}
