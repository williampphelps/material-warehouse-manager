import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { useState } from 'react';

export default function FromBinStep (props) {
    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint = '/api/bins/?binName='  + e.target.frombin.value;

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(endpoint, options).then((res) => res.json()).then((data) => {
            if (data.data !== null && !Array.isArray(data.data)) {
                if (!data.data.active) {
                    setErrorText("You Cannot Transfer Out of This Bin!");
                    setErrorState(true);
                } else {
                    props.setFromBin(data.data);
                    props.nextStep();
                }
            } else {
                setErrorText("Bin Not Found!");
                setErrorState(true);
            }
        });

    }

    return (
        <>
        <StepContent>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1}} name="frombin" label="Bin" onChange={() => { setErrorState(false); setErrorText(""); }} variant="standard" defaultValue={props.fromBin.name} helperText={errorText} error={errorState} />
                <Button variant="outlined" type="submit">Next</Button>
            </form>
        </StepContent>
        </>
    )
}
