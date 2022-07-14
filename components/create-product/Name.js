import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useState } from 'react';



export default function CPName (props) {

    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);

    const submitName = async (e) => {
        e.preventDefault();
        if (e.target.name.value != "") {
            let data = {
                name: e.target.name.value,
            }
            const jsonData = JSON.stringify(data);

            let endpoint = '/api/products'

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            }

            if (props.product._id != "") {
                endpoint += "/" + props.product._id;
                options.method = 'PATCH';
                console.log(options)
            }

            fetch(endpoint, options).then((res) => res.json()).then((data) => {
                props.setProduct(data.data);
                props.nextStep();
            })
            // props.nextStep();
        } else {
            setErrorText("Must Input Product Name");
            setErrorState(true);
        }

    }

    return (
        <>
            <StepContent>
                <form onSubmit={submitName}>
                    <TextField sx={{ mb: 2, width: 1}} name="name" label="Enter Product Name Here..." variant="standard" defaultValue={props.product.name} helperText={errorText} error={errorState} />

                    <Button variant="outlined" type="submit">Next</Button>
                </form>
            </StepContent>
        </>
    )
}
