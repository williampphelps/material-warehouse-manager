import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function InventoryListItem (props) {

    const { data: productData } = useSWR('/api/products/' + props.inventory.product, fetcher,);
    if (!productData) {
        return (
            <>Loading...</>
        )
    }
    return (
        <>
            <ListItemButton onClick={() => { props.setFromProduct(productData.data); props.setFromInventory(props.inventory); props.nextStep(); }}>
                <ListItemText primary={productData.data.name} secondary={props.inventory.quantity.map((qvalue, qindex) => {
                        return (
                            <small key={qindex}>{qvalue.quantity} {qvalue.unit}, </small>
                        )
                    })} />
                <ListItemIcon></ListItemIcon>
            </ListItemButton>
        </>
    )
}
