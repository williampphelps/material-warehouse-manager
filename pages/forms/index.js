import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReportIcon from '@mui/icons-material/Report';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

import NavBar from '/components/NavBar';

import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

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
                <Container><h1>Fill Out A Form</h1></Container>
            </Paper>
            <Paper elevation={1} sx={{ my: 2 }}>
                <List>
                    <NextLink href="/forms/near-miss"><ListItemButton>
                        <ListItemIcon><ReportIcon /></ListItemIcon>
                        <ListItemText primary="Near Miss" />
                    </ListItemButton></NextLink>
                    <NextLink href="/forms/forklift-inspection"><ListItemButton>
                        <ListItemIcon><ContentPasteSearchIcon /></ListItemIcon>
                        <ListItemText primary="Fork Lift Inspection" />
                    </ListItemButton></NextLink>
                </List>
            </Paper>
        </Container>
        <NavBar currentPage={2} />
       </>
    )
}
