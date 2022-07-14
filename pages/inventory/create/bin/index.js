
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import NavBar from '/components/NavBar';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateBinPage() {
    const router = useRouter();
    const { callback } = router.query;
    const [activeStep, setActiveStep] = useState(0);
    const [binStatus, setBinStatus] = useState("true");

    const handleBinStatusChange = (e) => {
        setBinStatus(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            name: e.target.name.value,
            active: e.target.active.value,
        }
        const jsonData = JSON.stringify(data);

        let endpoint = '/api/bins'

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        }

        fetch(endpoint, options).then((res) => res.json()).then((data) => {
            if (callback) {
                router.push(callback + data.data._id);
            } else {
                router.push("/inventory/");
            }

        })
    }
    return (
        <>
        <Container sx={{ p: 2, mb: 10 }}>
            <h1>Create New Bin</h1>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1 }} label="Bin Name" name="name" variant="standard" />
                <TextField sx={{ mb: 2, width: 1 }} select label="Bin Status" name="active" value={binStatus} onChange={handleBinStatusChange} variant="standard">
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                </TextField>
                <Button sx={{ mb:2, width: 1 }} variant="outlined" type="submit">Create New Bin</Button>
            </form>
        </Container>
        <NavBar currentPage={1} />
        </>
    )
}
