import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import NavBar from '/components/NavBar';

import { useRouter } from 'next/router';
import NextLink from 'next/link';


import { useState } from 'react';

export default function HomePage() {
    const router = useRouter();
    const [value, setValue] = useState(0);
    const bottomNavLinks = ["/", "/inventory/", "/assignments/", "/forms/"];

    const handleBottomNav = async (e, newValue) => {
        setValue(newValue);
        router.push(bottomNavLinks[newValue])
    }

    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container><h1>Welcome to the <Box sx={{ color: 'primary.main' }}>Camp Chef Portal!</Box></h1></Container>
            </Paper>
            <Stack spacing={1}>
                <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Manage Inventory
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Do inventory transfers, create new products and bins, lookup where items are, lookup what items are in a bin, etc...
                      </Typography>
                      <NextLink href="/inventory/"><Button variant="outlined" sx={{ mt: 2 }}>Manage Inventory</Button></NextLink>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Manage Assignments
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Create and assign tasks, complete tasks, manage projects and progress...
                      </Typography>
                      <NextLink href="/assignments/"><Button variant="outlined" sx={{ mt: 2 }}>Manage Assignments</Button></NextLink>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Forms
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fill out a near miss form, ShipHawk packaging adjustment, or Camp Chef Portal feature request.
                      </Typography>
                      <NextLink href="/forms/"><Button variant="outlined" sx={{ mt: 2 }}>Fill out a Form</Button></NextLink>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
        <NavBar currentPage={0} />
       </>
    )
}
