import { Paper, List } from '@mui/material';
import ItemLookupDetail from '/components/inquiry/ItemLookupDetail';

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function ItemLookupTable (props) {
    const { data: productData } = useSWR(props.api, fetcher,);
    if (!productData) {
        return (
            <Paper elevation={1} sx={{ my: 2 }}>
                <p>Loading...</p>
            </Paper>
        )
    }
    if (!Array.isArray(productData.data)) {

        return (
            <List sx={{ mx: 2 }} key={productData.data._id}>
                <h2>{productData.data.name}</h2>
                <ItemLookupDetail product={productData.data._id} />
            </List>
        )
    }
    return (
        <>
        {productData.data.map((value, index) => {
            return (
                <List sx={{ mx: 2 }} key={value._id}>
                    <h2>{value.name}</h2>
                    <ItemLookupDetail product={value._id} />
                </List>
            )
        })}
        </>
    )
}
