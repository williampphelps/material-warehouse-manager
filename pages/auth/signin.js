import { getCsrfToken } from "next-auth/react"

import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

import { Container, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignInPage({ csrfToken }) {

    const router = useRouter();

    const [userType, setUserType] = useState('');

    const handleTypeChange = (event) => {
        setUserType(event.target.value);
    }

    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><Image src={fullLogo} alt="Camp Chef Logo" /></Stack>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container>
                    <h1>Sign In</h1>
                    <form method="post" action="/api/auth/callback/credentials" className="px-5">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <TextField sx={{ mb: 2, width: 1}} name="username" label="Username" variant="standard" />
                        <TextField sx={{ mb: 2, width: 1}} name="password" label="Password" type="password" variant="standard" />
                        <Button sx={{ mb:2, width: 1 }} variant="outlined" type="submit">Sign In</Button>
                    </form>
                </Container>
            </Paper>
        </Container>
        </>
    )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
