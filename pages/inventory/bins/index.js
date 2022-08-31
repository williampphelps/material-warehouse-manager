import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import NavBar from '/components/NavBar';
import Stack from '@mui/material/Stack';

import BinInquiryTable from '/components/inquiry/BinInquiry';

import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { useState } from 'react';
export default function BinInquiry () {
    const router = useRouter();
    const [value, setValue] = useState(0);
    const [binApi, setBinApi] = useState("/api/bins/");
    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);
    const bottomNavLinks = ["/", "/inventory/", "/assignments/", "/forms/"];

    const handleBottomNav = async (e, newValue) => {
        setValue(newValue);
        router.push(bottomNavLinks[newValue])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (e.target.bin.value == "") {
            setBinApi("/api/bins/");
        } else {
            let endpoint = '/api/bins/?binName='  + e.target.bin.value;

            let options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            fetch(endpoint, options).then((res) => res.json()).then((data) => {
                if (data.data !== null && !Array.isArray(data.data)) {
                    setBinApi("/api/bins/?binName=" + e.target.bin.value);
                } else {
                    setErrorText("Invalid Bin");
                    setErrorState(true);
                }
            });
        }

    }

    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container><h1>Bin Inquiry</h1></Container>
                <Box sx={{ mx: 2 }}><form onSubmit={handleSubmit}>
                    <TextField sx={{ mb: 2, width: 1}} name="bin" label="Scan or Type Bin Name" onChange={() => { setErrorState(false); setErrorText(""); }} variant="standard" helperText={errorText} error={errorState} autoFocus />
                </form></Box>
            </Paper>
            <Paper elevation={1} sx={{ my: 2 }}>
                <BinInquiryTable api={binApi} />
            </Paper>
        </Container>
        <NavBar currentPage={99} />
        </>
    )
}
