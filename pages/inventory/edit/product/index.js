import { Container, Paper, List, ListItemButton, ListItemText, ListItemIcon, Box, TextField } from '@mui/material';


import NavBar from '/components/NavBar';
import ItemList from '/components/edit/ItemList';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EditProductList() {

    const router = useRouter();

    const [errorText, setErrorText] = useState("");
    const [errorState, setErrorState] = useState(false);

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
                router.push("/inventory/edit/product/" + data.data._id);
            } else if (data.data !== null && data.data.length == 1) {
                router.push("/inventory/edit/product/" + data.data[0]._id);
            } else {
                setErrorText("Product Not Found!");
                setErrorState(true);
            }
        });

    }

    return (
        <>
        <Container sx={{ p: 2, mb: 10 }}>
            <h1>Edit Product</h1>
            <Box sx={{ mx: 2 }}><form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1}} name="search" label="Scan or Search for Product" onChange={() => { setErrorState(false); setErrorText(""); }} variant="standard" helperText={errorText} error={errorState} autoFocus />
            </form></Box>
            <p>Select Product to Edit...</p>
            <ItemList />
        </Container>
        <NavBar currentPage={1} />
        </>
    )
}
