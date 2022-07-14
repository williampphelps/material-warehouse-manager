import { Paper, List, ListItem, ListItemText } from '@mui/material';
import ItemLookupDetail from '/components/inquiry/ItemLookupDetail';

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function ItemLookupTable (props) {
    const { data: inventoryData } = useSWR('/api/inventory/?productId=' + props.product, fetcher,);
    if (!inventoryData) {
        return (
            <Paper elevation={1} sx={{ my: 2 }}>
                <p>Loading...</p>
            </Paper>
        )
    }
    return (
        <>
        {inventoryData.data.map((value, index) => {
            return (
                <ListItem key={value._id}>
                    <ListItemText primary={value.binName} secondary={value.quantity.map((qvalue, qindex) => {
                            return (
                                <small>{qvalue.quantity} {qvalue.unit}, </small>
                            )
                        })} />
                </ListItem>
            )
        })}
        </>
    )
}
