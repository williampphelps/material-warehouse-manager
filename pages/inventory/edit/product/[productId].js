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

import CPName from '/components/edit-product/Name';
import CPManufacturer from '/components/edit-product/Manufacturer';
import CPModel from '/components/edit-product/Model';
import CPType from '/components/edit-product/Type';
import CPMinStock from '/components/edit-product/MinStock';
import CPupc from '/components/edit-product/UPC';

import NextLink from 'next/link';
import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

import useSWR, { useSWRConfig } from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

export default function CreateProductPage() {
    const router = useRouter();
    const { productId } = router.query;
    const [activeStep, setActiveStep] = useState(0);
    const [product, setProduct] = useState({
        _id: "",
        name: "",
        manufacturer: "",
        model: "",
        type: "",
        upc: "",
    });

    const { data } = useSWR('/api/products/' + productId, fetcher,);

    useEffect(() => {
        console.log(data);
        if (data) {
            setProduct(data.data);
        }
    }, [data]);

    if (!data) {
        return (
            <>
            Loading...
            </>
        )
    }

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
            <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center"><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
            <h1>Edit Product</h1>
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
        <NavBar currentPage={99} />
        </>
    )
}
