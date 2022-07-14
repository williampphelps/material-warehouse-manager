import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import InventoryListItem from '/components/transfer/InventoryListItem';


import { useState } from 'react';

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function FromProductStep (props) {
    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);
    const { data: inventoryData } = useSWR('/api/inventory/?binId=' + props.fromBin._id, fetcher,);


    if (!inventoryData) {
        return (
            <Paper elevation={1} sx={{ my: 2 }}>
                <p>Loading...</p>
            </Paper>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint = '/api/products/?search='  + e.target.fromproduct.value;

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(endpoint, options).then((res) => res.json()).then((data) => {
            if (data.data !== null) {

                if (data.data.length == 1) {
                    let endpoint = '/api/inventory/?binId='  + props.fromBin._id + '&productId=' + data.data[0]._id;

                    let options = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }

                    fetch(endpoint, options).then((res) => res.json()).then((inventoryData) => {
                        if (inventoryData.data.length == 1) {
                            props.setFromProduct(data.data[0]);
                            props.setFromInventory(inventoryData.data);
                            props.nextStep();
                        } else {
                            setErrorText("Product Not Found!");
                            setErrorState(true);
                        }
                    });
                } else {
                    setErrorText("Product Not Found!");
                    setErrorState(true);
                }

                // props.setFromProduct(data.data);
                // props.nextStep();
            } else {
                setErrorText("Product Not Found!");
                setErrorState(true);
            }
        });

    }

    return (
        <>
        <StepContent>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1}} name="fromproduct" label="Product" variant="standard" defaultValue={props.fromProduct.upc} helperText={errorText} error={errorState} onChange={() => { setErrorState(false); setErrorText(""); }} />
                <Paper elevation={1} sx={{ my: 2 }}>
                    <List>
                        {inventoryData.data.map((value, index) => {

                            return (
                                <InventoryListItem key={index} setFromProduct={props.setFromProduct} setFromInventory={props.setFromInventory} nextStep={props.nextStep} inventory={value} />
                            )
                        })}
                    </List>
                </Paper>
                <Button variant="outlined" type="submit">Next</Button>
            </form>
        </StepContent>
        </>
    )
}
