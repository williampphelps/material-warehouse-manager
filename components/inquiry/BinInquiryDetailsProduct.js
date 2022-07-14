import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function BinInquiryDetailsProduct (props) {
    const { data: productData } = useSWR('/api/products/' + props.product, fetcher,);

    if (!productData) {
        return (
            <>Loading...</>
        )
    }
    return (
        <ListItem>
            <ListItemText primary={productData.data.name} secondary={props.quantity.map((value, index) => {
                    return (
                        <small key={value._id}>{value.quantity} {value.unit}, </small>
                    )
                })} />
        </ListItem>
    )
}
