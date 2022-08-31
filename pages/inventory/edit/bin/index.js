import { Container, Paper, List, ListItemButton, ListItemText, ListItemIcon, Box, TextField, Stack } from '@mui/material';


import NavBar from '/components/NavBar';
import BinList from '/components/edit/BinList';

import { useState } from 'react';
import { useRouter } from 'next/router';

import NextLink from 'next/link';
import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

export default function EditBinList() {

    const router = useRouter();

    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint = '/api/bins/?binName='  + e.target.bin.value;

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(endpoint, options).then((res) => res.json()).then((data) => {
            if (data.data !== null && !Array.isArray(data.data)) {
                router.push("/inventory/edit/bin/" + data.data._id);
            } else {
                setErrorText("Bin Not Found!");
                setErrorState(true);
            }
        });

    }

    return (
        <>
        <Container sx={{ p: 2, mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
            <h1>Edit Bin</h1>
            <Box sx={{ mx: 2 }}><form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1}} name="bin" label="Scan or Search for Bin" onChange={() => { setErrorState(false); setErrorText(""); }} variant="standard" helperText={errorText} error={errorState} autoFocus />
            </form></Box>
            <p>Select Bin to Edit...</p>
            <BinList />
        </Container>
        <NavBar currentPage={99} />
        </>
    )
}
