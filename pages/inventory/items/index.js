import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import NavBar from '/components/NavBar';
import Stack from '@mui/material/Stack';

import ItemLookupTable from '/components/inquiry/ItemLookup';

import NextLink from 'next/link';
import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

import { useRouter } from 'next/router';

import { useState } from 'react';
export default function BinInquiry () {
    const router = useRouter();
    const [value, setValue] = useState(0);
    const [productApi, setProductApi] = useState("/api/products/");
    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);
    const bottomNavLinks = ["/", "/inventory/", "/assignments/", "/forms/"];

    const handleBottomNav = async (e, newValue) => {
        setValue(newValue);
        router.push(bottomNavLinks[newValue])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setProductApi("/api/products/?search=" + encodeURI(e.target.search.value));

    }

    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container><h1>Item Lookup</h1></Container>
                <Box sx={{ mx: 2 }}><form onSubmit={handleSubmit}>
                    <TextField sx={{ mb: 2, width: 1}} name="search" label="Scan or Search for Item" onChange={() => { setErrorState(false); setErrorText(""); }} variant="standard" helperText={errorText} error={errorState} autoFocus />
                </form></Box>
            </Paper>
            <Paper elevation={1} sx={{ my: 2 }}>
                <ItemLookupTable api={productApi} />
            </Paper>
        </Container>
        <NavBar currentPage={99} />
        </>
    )
}
