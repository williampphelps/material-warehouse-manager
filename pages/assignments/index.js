import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import NavBar from '/components/NavBar';

import { useRouter } from 'next/router';
import NextLink from 'next/link';


import { useState } from 'react';
export default function HomePage() {
    const router = useRouter();
    const [value, setValue] = useState(2);
    const bottomNavLinks = ["/", "/inventory/", "/assignments/", "/forms/"];

    const handleBottomNav = async (e, newValue) => {
        setValue(newValue);
        router.push(bottomNavLinks[newValue])
    }

    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container><h1>Assignments</h1></Container>
            </Paper>
        </Container>
        <NavBar currentPage={2} />
       </>
    )
}
