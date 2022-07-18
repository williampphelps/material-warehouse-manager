import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { useState } from 'react';

import { useRouter } from 'next/router';

export default function CPUPC (props) {
    const router = useRouter();
    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);

    const submitUPC = async (e) => {
        e.preventDefault();
        let data = {
            upc: e.target.upc.value,
        }
        const jsonData = JSON.stringify(data);

        let endpoint = '/api/products/' + props.product._id;

        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        }

        fetch(endpoint, options).then((res) => res.json()).then((data) => {
            router.push("/inventory/");
        });

    }

    return (
        <>
            <StepContent>
                <form onSubmit={submitUPC}>
                    <TextField sx={{ mb: 2, width: 1}} name="upc" label="Enter Product UPC Here..." variant="standard" defaultValue={props.product.upc} helperText={errorText} error={errorState} />

                    <Stack direction="row" spacing={2}><Button variant="outlined" color="secondary" onClick={props.handleBack}>Back</Button><Button variant="contained" type="submit">Finish</Button></Stack>
                </form>
            </StepContent>
        </>
    )
}
