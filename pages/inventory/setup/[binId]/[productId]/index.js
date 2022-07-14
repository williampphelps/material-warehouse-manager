
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import NavBar from '/components/NavBar';
import ItemList from '/components/setup/ItemList';

import { useRouter } from 'next/router';
import { useState } from 'react';

const filter = createFilterOptions();

import useSWR, { useSWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ProductSetupPage() {
    const router = useRouter();
    const { binId, productId } = router.query;
    const { data: binData } = useSWR('/api/bins/' + binId, fetcher,);
    const { data: productData } = useSWR('/api/products/' + productId, fetcher,);

    const [unitValue, setUnitValue] = useState({ title: "pallets" });
    const unitOptions = [
        { title: "pallets", },
        { title: "bundles", },
        { title: "cases", },
        { title: "rolls", },
        { title: "individuals", },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            product: productId,
            productUPC: productData.data.upc,
            bin: binId,
            quantity: {
                quantity: event.target.quantity.value,
                unit: unitValue.title,
            },
            name: productData.data.model,
            binName: binData.data.name,
        }
        let jsonData = JSON.stringify(data);

        let endpoint = '/api/inventory'

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        }

        fetch(endpoint, options).then((res) => res.json()).then((data) => {
            router.push("/inventory/");
        });
    }

    if (!binData) {
        return (
            <p>Loading...</p>
        )
    }
    if (!productData) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <>
        <Container sx={{ p: 2, mb: 10 }}>
            <h1>Initial Setup / Receiving</h1>
            <p>Choose Quanitity of <b>{productData.data.name}</b> to move into <b>{binData.data.name}</b></p>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ mb: 2, width: 1 }} name="quantity" label="Quantity" variant="standard" type="number" InputProps={{ endAdornment: <InputAdornment position="end">{unitValue.title}</InputAdornment>, }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 0.125, min: 0 }} />
                <Autocomplete
                    value={unitValue}
                    onChange={(event, newValue) => {
                        if (newValue !== null) {
                            if (typeof newValue === 'string') {
                              setUnitValue({
                                title: newValue,
                              });
                            } else if (newValue && newValue.inputValue) {
                              // Create a new value from the user input
                              setUnitValue({ title: newValue.inputValue, });
                            } else {
                              setUnitValue(newValue);
                            }
                        }

                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option.title);
                        if (inputValue !== '' && !isExisting) {
                          filtered.push({
                            inputValue,
                            title: `Add "${inputValue}"`,
                          });
                        }

                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={unitOptions}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                          return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // Regular option
                        return option.title;
                    }}
                    renderOption={(props, option) => <li {...props}>{option.title}</li>}
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} sx={{ mb: 2, width: 1 }} label="Unit" variant="standard" />
                    )}
                />
                <Button sx={{ mb:2, width: 1 }} variant="outlined" type="submit">Recieve {productData.data.model} {productData.data.type} into {binData.data.name}</Button>
            </form>
        </Container>
        <NavBar currentPage={1} />
        </>
    )
}
