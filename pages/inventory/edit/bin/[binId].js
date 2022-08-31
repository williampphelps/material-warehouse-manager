import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import NavBar from '/components/NavBar';

import NextLink from 'next/link';
import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function EditBinPage() {
    const router = useRouter();
    const { binId } = router.query;
    const { callback } = router.query;
    const [activeStep, setActiveStep] = useState(0);
    const [binStatus, setBinStatus] = useState(true);

    const { data } = useSWR('/api/bins/' + binId, fetcher,);

    useEffect(() => {
        console.log(data);
        if (data) {
            if (data.data.active) {
                setBinStatus("true");
            } else {
                setBinStatus("false");
            }
        }
    }, [data]);

    if (!data) {
        return (
            <>
            Loading...
            </>
        )
    }

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

        let endpoint = '/api/bins/' + binId

        let options = {
            method: 'PATCH',
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

        });
    }

    return (
        <>
        <Container sx={{ p: 2, mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
            <h1>Edit Bin</h1>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1 }} label="Bin Name" name="name" defaultValue={data.data.name} variant="standard" />
                <TextField sx={{ mb: 2, width: 1 }} select label="Bin Status" name="active" value={binStatus} onChange={handleBinStatusChange} variant="standard">
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                </TextField>
                <Button sx={{ mb:2, width: 1 }} variant="outlined" type="submit">Edit Bin</Button>
            </form>
        </Container>
        <NavBar currentPage={99} />
        </>
    )
}
