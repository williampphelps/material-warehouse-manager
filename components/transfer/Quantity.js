import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import { useState, useEffect } from 'react';

export default function QuantityStep (props) {
    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);
    const [newQuantity, setNewQuantity] = useState([]);
    const [remain, setRemain] = useState([]);

    useEffect(() => {
        if (props.fromInventory !== null) {
            let tempQ = [];
            let tempR = [];
            for (let q in props.fromInventory.quantity) {
                tempQ.push({
                    quantity: 0,
                    unit: props.fromInventory.quantity[q].unit
                })
                tempR.push(props.fromInventory.quantity[q].quantity);
            }
            setNewQuantity(tempQ);
            setRemain(tempR);
        }
    }, [props.fromInventory]);

    const handleChange = (index, e) => {
        let data = [...newQuantity];
        let rdata = [...remain];
        data[index] = {
            quantity: event.target.value,
            unit: event.target.name
        }
        console.log(props.fromInventory.quantity[index].quantity - data[index].quantity);
        rdata[index] = (props.fromInventory.quantity[index].quantity - data[index].quantity);
        console.log(rdata[index]);
        setNewQuantity(data);
        setRemain(rdata);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        props.setQuantity(newQuantity);

        props.nextStep();

    }
    if (props.fromInventory !== null) {
        return (
            <>
            <StepContent>
                <form onSubmit={handleSubmit}>
                    {props.fromInventory.quantity.map((value, index) => {
                        let unit = value.unit
                        unit = unit.charAt(0).toUpperCase() + unit.slice(1)
                        console.log(newQuantity[index]);
                        return (
                            <TextField key={index} onChange={event => handleChange(index, event)} sx={{ mb: 2, width: 1}} name={value.unit} label={unit} defaultValue={newQuantity[index] !== undefined ? newQuantity[index].quantity : 0} variant="standard" InputProps={{ endAdornment: <InputAdornment position="end">/ {value.quantity} {unit}</InputAdornment>, }} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 0.125, min: 0, max: value.quantity }}  />
                        )
                    })}
                    <Button variant="outlined" type="submit">Next</Button>
                </form>
            </StepContent>
            </>
        )
    }

}
