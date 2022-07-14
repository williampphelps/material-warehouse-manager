import NavBar from "/components/NavBar";

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import CPName from '/components/create-product/Name';
import CPManufacturer from '/components/create-product/Manufacturer';
import CPModel from '/components/create-product/Model';
import CPType from '/components/create-product/Type';
import CPMinStock from '/components/create-product/MinStock';
import CPupc from '/components/create-product/UPC';

import { useState } from 'react';
export default function CreateProductPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [product, setProduct] = useState({
        _id: "",
        name: "",
        manufacturer: "",
        model: "",
        type: "",
        upc: "",
    });

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
        <Container sx={{ p: 2, mb: 10 }}>
            <h1>Create New Product</h1>
            <Stepper activeStep={activeStep} orientation="vertical">

                <Step key="ProductName">
                    <StepLabel onClick={(e) => setActiveStep(0)}>Product Name: <b>{product.name}</b></StepLabel>
                    <CPName nextStep={handleNext} setProduct={setProduct} product={product} />
                </Step>
                <Step key="ProductManufacturer">
                    <StepLabel onClick={(e) => { if (product._id != "") { setActiveStep(1) } } }>Product Manufacturer: <b>{product.manufacturer}</b></StepLabel>
                    <CPManufacturer nextStep={handleNext} handleBack={handleBack} setProduct={setProduct} product={product} />
                </Step>
                <Step key="ProductModel">
                    <StepLabel onClick={(e) => { if (product._id != "") { setActiveStep(2) } } }>Product Model/SKU: <b>{product.model}</b></StepLabel>
                    <CPModel nextStep={handleNext} handleBack={handleBack} setProduct={setProduct} product={product} />
                </Step>
                <Step key="ProductType">
                    <StepLabel onClick={(e) => { if (product._id != "") { setActiveStep(3) } } }>Product Type: <b>{product.type}</b></StepLabel>
                    <CPType nextStep={handleNext} handleBack={handleBack} setProduct={setProduct} product={product} />
                </Step>
                <Step key="MinimumStock">
                    <StepLabel onClick={(e) => { if (product._id != "") { setActiveStep(4) } } }>Minimum Stock: <b>{product.minStock} pallets</b></StepLabel>
                    <CPMinStock nextStep={handleNext} handleBack={handleBack} setProduct={setProduct} product={product} />
                </Step>
                <Step key="UPC">
                    <StepLabel onClick={(e) => { if (product._id != "") { setActiveStep(5) } } }>Product UPC: <b>{product.upc}</b></StepLabel>
                    <CPupc nextStep={handleNext} handleBack={handleBack} setProduct={setProduct} product={product} />
                </Step>
            </Stepper>
        </Container>
        <NavBar currentPage={1} />
        </>
    )
}
