import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

import { useState } from 'react';



export default function CPMinStock (props) {

    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);

    const submitMinStock = async (e) => {
        e.preventDefault();
        let data = {
            minStock: e.target.minStock.value,
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
                <form onSubmit={submitMinStock}>
                    <TextField sx={{ mb: 2, width: 1}} name="minStock" label="Product Minimum Stock" variant="standard" InputProps={{ endAdornment: <InputAdornment position="end">pallets</InputAdornment>, }} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 0.125, min: 0 }}  />

                    <Stack direction="row" spacing={2}><Button variant="outlined" color="secondary" onClick={props.handleBack}>Back</Button><Button variant="outlined" type="submit">Next</Button></Stack>
                </form>
            </StepContent>
        </>
    )
}
