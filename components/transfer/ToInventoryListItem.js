import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ToInventoryListItem (props) {
    if (props.exclude != props.inventory.bin) {
        return (
                <ListItemButton onClick={event => props.transferInventory(props.inventory._id, event)}>
                     <ListItemText primary={props.inventory.binName} />
                    <ListItemIcon>{props.inventory.quantity.map((qvalue, qindex) => {
                           return (
                               <small key={qindex}>{qvalue.quantity} {qvalue.unit}, </small>
                           )
                       })}</ListItemIcon>
                </ListItemButton>
        )
    }

}
