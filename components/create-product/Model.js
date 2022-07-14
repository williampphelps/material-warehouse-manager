import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { useState } from 'react';



export default function CPModel (props) {

    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);

    const submitModel = async (e) => {
        e.preventDefault();
        let data = {
            model: e.target.model.value,
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
            props.setProduct(data.data);
            props.nextStep();
        });

    }

    return (
        <>
            <StepContent>
                <form onSubmit={submitModel}>
                    <TextField sx={{ mb: 2, width: 1}} name="model" label="Enter Product Model Here..." variant="standard" defaultValue={props.product.model} helperText={errorText} error={errorState} />

                    <Stack direction="row" spacing={2}><Button variant="outlined" color="secondary" onClick={props.handleBack}>Back</Button><Button variant="outlined" type="submit">Next</Button></Stack>
                </form>
            </StepContent>
        </>
    )
}
