import { Container, Stack, Paper, FormGroup, FormControlLabel, FormLabel, Checkbox, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';
import NavBar from '/components/NavBar';
import NextLink from 'next/link';
import { useState } from 'react';
export default function NearMissFormPage() {

    const [reported, setReported] = useState("");
    const [supervisor, setSupervisor] = useState("");

    const [conditions, setConditions] = useState({
        "Near Miss": false,
        "Safety Concern": false,
        "Safety Suggestion": false,
        "Other": false,
    });

    const [types, setTypes] = useState({
        "Unsafe Act": false,
        "Unsafe condition of area": false,
        "Unsafe use of equipment": false,
        "Other": false
    });

    const changeConditions = (e) => {
        setConditions({
            ...conditions,
            [e.target.name]: e.target.checked,
        });
    }

    const changeTypes = (e) => {
        setTypes({
            ...types,
            [e.target.name]: e.target.checked,
        });
    }

    const changeReported = (e) => {
        setReported(e.target.value);
    }
    const changeSupervisor = (e) => {
        setSupervisor(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let stringConditions = [];
        let stringTypes = [];

        for (let condition in conditions) {
            if (conditions[condition]) {
                stringConditions.push(condition)
            }
        }

        for (let type in types) {
            if (types[type]) {
                stringTypes.push(type)
            }
        }

        console.log(stringConditions)
        console.log(stringTypes)
        console.log(e.target.description.value)
        console.log(e.target.suggestions.value)
        console.log(reported)
        console.log(supervisor)
    }
    return (
        <>
        <Container sx={{ mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
            <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                <Container>
                    <h1>Near Miss Form</h1>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} direction="column">
                            <FormGroup>
                                <FormLabel component="legend">Mark all appropriate conditions:</FormLabel>
                                <FormControlLabel control={<Checkbox name="Near Miss" onChange={changeConditions} />} label="Near Miss" />
                                <FormControlLabel control={<Checkbox name="Safety Concern" onChange={changeConditions} />} label="Safety Concern" />
                                <FormControlLabel control={<Checkbox name="Safety Suggestion" onChange={changeConditions} />} label="Safety Suggestion" />
                                <FormControlLabel control={<Checkbox name="Other" onChange={changeConditions} />} label="Other (please describe):" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel component="legend">Type of concern:</FormLabel>
                                <FormControlLabel control={<Checkbox name="Unsafe Act"  onChange={changeTypes} />} label="Unsafe Act" />
                                <FormControlLabel control={<Checkbox name="Unsafe condition of area" onChange={changeTypes} />} label="Unsafe condition of area" />
                                <FormControlLabel control={<Checkbox name="Unsafe use of equipment" onChange={changeTypes} />} label="Unsafe use of equipment" />
                                <FormControlLabel control={<Checkbox name="Other" onChange={changeTypes} />} label="Other (please describe):" />
                            </FormGroup>
                            <TextField sx={{ mb: 2, width: 1 }} name="description" label="Description" helperText="The potential incident/hazard/concern (in as much detail as possible)" multiline />
                            <TextField sx={{ mb: 2, width: 1 }} name="suggestions" label="Safety Suggestions" helperText="What did you do to fix the incident/hazard/concern" multiline />
                            <FormControl>
                                <InputLabel>Reported Employee</InputLabel>
                                <Select label="Reported Employee" value={reported} onChange={changeReported}>
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="Tim Fowler">Tim Fowler</MenuItem>
                                    <MenuItem value="Andrew Bowles">Andrew Bowles</MenuItem>
                                    <MenuItem value="Kelly Short">Kelly Short</MenuItem>
                                    <MenuItem value="Natasha Stubbs">Natasha Stubbs</MenuItem>
                                    <MenuItem value="Dago Rodriguez">Dago Rodriguez</MenuItem>
                                    <MenuItem value="Derek Sundstrom">Derrek Sundstrom</MenuItem>
                                    <MenuItem value="Brayden Palmer">Brayden Palmer</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel>Supervisor</InputLabel>
                                <Select label="Supervisor" value={supervisor} onChange={changeSupervisor}>
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="Kelly Short">Kelly Short</MenuItem>
                                    <MenuItem value="Ashley Alvarez">Ashley Alvarez</MenuItem>
                                    <MenuItem value="Jared Nelson">Jared Nelson</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{ mb:2, width: 1 }} variant="outlined" type="submit">Submit Near Miss Form</Button>
                        </Stack>

                    </form>
                </Container>
            </Paper>
        </Container>
        <NavBar currentPage={99} />
        </>
    )
}
