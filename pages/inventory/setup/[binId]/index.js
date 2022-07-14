
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import NavBar from '/components/NavBar';
import ItemList from '/components/setup/ItemList';

import { useRouter } from 'next/router';
import { useState } from 'react';

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function SetupBinIdPage() {
    const router = useRouter();
    const { binId } = router.query;
    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);
    const { data } = useSWR('/api/bins/' + binId, fetcher,);

    if (!data) {
        return (
            <p>Loading...</p>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint = '/api/products/?search='  + e.target.search.value;

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(endpoint, options).then((res) => res.json()).then((data) => {
            console.log(data);
            if (data.data !== null && !Array.isArray(data.data)) {
                router.push("/inventory/setup/" + binId + "/" + data.data._id);
            } else if (data.data !== null && data.data.length == 1) {
                router.push("/inventory/setup/" + binId + "/" + data.data[0]._id);
            } else {
                setErrorText("Product Not Found!");
                setErrorState(true);
            }
        });

    }

    return (
        <>
        <Container sx={{ p: 2, mb: 10 }}>
            <h1>Initial Setup / Receiving</h1>
            <Box sx={{ mx: 2 }}><form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1}} name="search" label="Scan or Search for Product" onChange={() => { setErrorState(false); setErrorText(""); }} variant="standard" helperText={errorText} error={errorState} autoFocus />
            </form></Box>
            <p>Select Item to Add to Bin: <b>{data.data.name}</b></p>
            <ItemList binId={data.data._id} />
        </Container>
        <NavBar currentPage={1} />
        </>
    )
}
