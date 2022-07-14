import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ToInventoryListItem from '/components/transfer/ToInventoryListItem';

import { useState } from 'react';
import { useRouter } from 'next/router';

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());


export default function ToBinStep (props) {
    const router = useRouter();
    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);
    const { data: inventoryData } = useSWR('/api/inventory/?productId=' + props.product._id, fetcher,);


    if (!inventoryData) {
        return (
            <Paper elevation={1} sx={{ my: 2 }}>
                <p>Loading...</p>
            </Paper>
        )
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint = '/api/bins/?binName='  + e.target.tobin.value;

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(endpoint, options).then((res) => res.json()).then((data) => {
            if (data.data !== null && !Array.isArray(data.data) && data.data._id != props.fromBin._id) {

                for (let q in props.quantity) {

                    let endpoint = '/api/inventory/?binId='  + data.data._id + '&productId=' + props.product._id;

                    let options = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }

                    fetch(endpoint, options).then((res) => res.json()).then((mData) => {
                        let submitData = {};
                        if (mData.data !== null && mData.data.length > 0) {
                            console.log("FOUND EXISTING COUNT IN TO BIN")
                            console.log(mData.data);
                            submitData = {
                                fromInventory: props.fromInventory._id,
                                quantity: {
                                    unit: props.quantity[q].unit,
                                    quantity: props.quantity[q].quantity,
                                },
                                toInventory: mData.data._id,
                            }
                        } else {
                            console.log("ADDING FOR FIRST TIME")
                            submitData = {
                                fromInventory: props.fromInventory._id,
                                newInventory: {
                                    product: props.product._id,
                                    productUPC: props.product.upc,
                                    bin: data.data._id,
                                    quantity: {
                                        unit: props.quantity[q].unit,
                                        quantity: props.quantity[q].quantity,
                                    },
                                    name: props.product.name,
                                    binName: data.data.name,
                                },
                                quantity: {
                                    unit: props.quantity[q].unit,
                                    quantity: props.quantity[q].quantity,
                                }
                            }
                        }
                        const jsonData = JSON.stringify(submitData);

                        endpoint = '/api/transfer/'

                        options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: jsonData,
                        }
                        console.log("SUBMITTING TRANSFER")
                        fetch(endpoint, options).then((res) => res.json()).then((nData) => {
                            console.log("DONE!");
                        });
                    })


                }
                router.push("/inventory/");
            } else {
                setErrorText("Bin Not Found!");
                setErrorState(true);
            }
        });

    }

    const transferInventory = (toInventory, index) => {

        console.log("TRANSFER BY BUTTON")

        for (let q in props.quantity) {
            const submitData = {
                fromInventory: props.fromInventory._id,
                quantity: {
                    unit: props.quantity[q].unit,
                    quantity: props.quantity[q].quantity,
                },
                toInventory: toInventory,
            }
            const jsonData = JSON.stringify(submitData);

            let endpoint = '/api/transfer/'

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            }
            fetch(endpoint, options).then((res) => res.json()).then((nData) => {
                console.log("DONE!")
            });
        }
        router.push("/inventory/");
    }

    return (
        <>
        <StepContent>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1}} name="tobin" label="Bin" onChange={() => { setErrorState(false); setErrorText(""); }} variant="standard" helperText={errorText} error={errorState} />
                <List>
                    {inventoryData.data.map((value, index) => {
                        return (
                            <ToInventoryListItem key={index} transferInventory={transferInventory} inventory={value} exclude={props.fromBin._id} />
                        )
                    })}
                </List>
            </form>
        </StepContent>
        </>
    )

}
