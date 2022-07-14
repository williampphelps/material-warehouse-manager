import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import BinInquiryDetailsProduct from '/components/inquiry/BinInquiryDetailsProduct';

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function BinInquiryDetails (props) {
    const { data: binData } = useSWR('/api/inventory/?binId=' + props.bin, fetcher,);

    if (!binData) {
        return (
            <Paper elevation={1} sx={{ my: 2 }}>
                <p>Loading...</p>
            </Paper>
        )
    }
    if (binData.data.length == 0) {
        return (
            <small>Empty Bin</small>
        )
    }
    return (
        <>
        {binData.data.map((value, index) => {
            return (
                <BinInquiryDetailsProduct key={value._id} product={value.product} quantity={value.quantity} />
            )
        })}
        </>
    )
}
