import { Container, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUpPage() {

    const router = useRouter();

    const [userType, setUserType] = useState('');

    const handleTypeChange = (event) => {
        setUserType(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let userData = {
            fname: event.target.fname.value,
            lname: event.target.lname.value,
            username: event.target.uname.value,
            password: event.target.pword.value,
            type: event.target.type.value,
        }

        let jsonData = JSON.stringify(userData);

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        }

        fetch("/api/auth/signup", options).then((res) => res.json()).then((data) => {
            router.push("/auth/signin");
        });

    }

    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><Image src={fullLogo} alt="Camp Chef Logo" /></Stack>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container>
                    <h1>Create a User</h1>
                    <form onSubmit={handleSubmit}>
                        <TextField sx={{ mb: 2, width: 1}} name="fname" label="First Name" variant="standard" />
                        <TextField sx={{ mb: 2, width: 1}} name="lname" label="Last Name" variant="standard" />
                        <TextField sx={{ mb: 2, width: 1}} name="uname" label="Username" variant="standard" />
                        <TextField sx={{ mb: 2, width: 1}} name="pword" label="Password" type="password" variant="standard" />
                        <FormControl fullWidth sx={{ mb: 2, width: 1}} variant="standard">
                            <InputLabel id="userTypeLabel">User Type</InputLabel>
                            <Select labelId="userTypeLabel" value={userType} label="User Type" onChange={handleTypeChange} name="type">
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="basic">Basic</MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ mb:2, width: 1 }} variant="outlined" type="submit">Create New User</Button>
                    </form>
                </Container>
            </Paper>
        </Container>
        </>
    )
}
