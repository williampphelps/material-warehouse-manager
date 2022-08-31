import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

import NavBar from '/components/NavBar';

import { useRouter } from 'next/router';
import NextLink from 'next/link';


import { useState } from 'react';
export default function HomePage() {
    const router = useRouter();

    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container><h1>Assignments</h1></Container>
            </Paper>
        </Container>
        <NavBar currentPage={1} />
       </>
    )
}
