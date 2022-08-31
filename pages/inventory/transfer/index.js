import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import FromBinStep from '/components/transfer/FromBin';
import FromProductStep from '/components/transfer/FromProduct';
import QuantityStep from '/components/transfer/Quantity';
import ToBinStep from '/components/transfer/ToBin';
import NavBar from '/components/NavBar';
import Stack from '@mui/material/Stack';

import NextLink from 'next/link';
import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

import { useState, useEffect } from 'react';

export default function TransferPage() {

    const [activeStep, setActiveStep] = useState(0);
    const [fromBin, setFromBin] = useState({
        _id: "",
        name: "",
        active: "",
    });
    const [toBin, setToBin] = useState({
        _id: "",
        name: "",
        active: "",
    });
    const [product, setProduct] = useState({
        _id: "",
        name: "",
        manufacturer: "",
        model: "",
        type: "",
        upc: "",
    });
    const [fromInventory, setFromInventory] = useState(null);
    const [quantity, setQuantity] = useState([]);

    useEffect(() => {
        setToBin({
            _id: "",
            name: "",
            active: "",
        });
        setProduct({
            _id: "",
            name: "",
            manufacturer: "",
            model: "",
            type: "",
            upc: "",
        });
        setFromInventory(null);
        setQuantity([]);
    }, [fromBin]);
    useEffect(() => {
        setQuantity([]);
    }, [product]);

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const changeStep = (n) => {
        if (activeStep >= n) {
            setActiveStep(n);
        }
    }
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
        <Container sx={{ p: 2, mb: 10 }}>
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
            <h1>Bin/Inventory Transfer</h1>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step key="FromBin">
                    <StepLabel onClick={(e) => setActiveStep(0)}>From Bin: <b>{fromBin.name}</b></StepLabel>
                    <FromBinStep nextStep={handleNext} handleBack={handleBack} setFromBin={setFromBin} fromBin={fromBin} />
                </Step>
                <Step key="FromProduct">
                    <StepLabel onClick={(e) => changeStep(1)}>Product: <b>{product.name}</b></StepLabel>
                    <FromProductStep nextStep={handleNext} handleBack={handleBack} setFromBin={setFromBin} fromBin={fromBin} setFromProduct={setProduct} fromProduct={product} setFromInventory={setFromInventory} />
                </Step>
                <Step key="Quantity">
                    <StepLabel onClick={(e) => changeStep(2)}>Quantity: <b>{quantity.map((value, index) => { return ( <>{value.quantity} {value.unit}, </> )})}</b></StepLabel>
                    <QuantityStep nextStep={handleNext} handleBack={handleBack} setQuantity={setQuantity} quantity={quantity} fromInventory={fromInventory} />
                </Step>
                <Step key="ToBin">
                    <StepLabel onClick={(e) => changeStep(3)}>To Bin</StepLabel>
                    <ToBinStep nextStep={handleNext} handleBack={handleBack} fromBin={fromBin} fromInventory={fromInventory} product={product} quantity={quantity} />
                </Step>
            </Stepper>
        </Container>
        <NavBar currentPage={99} />
        </>
    )
}
