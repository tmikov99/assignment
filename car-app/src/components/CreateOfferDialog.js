import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { postOffer } from '../util/RequestUtil';

const carDefaultValues = {
    model: "",
    year: "",
    fuel: "",
    automatic: "",
  };

  const offerDefaultValues = {
    town: "",
    dayCost: "",
    minDays: "",
    maxDays: "",
  };

export default function CreateOfferDialog(props) {
    
    const [open, setOpen] = React.useState(false);
    const [carFormValues, setCarFormValues] = useState(carDefaultValues);
    const [offerFormValues, setOfferFormValues] = useState(offerDefaultValues);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCarFormValues(carDefaultValues);
        setOfferFormValues(offerDefaultValues);
    };

    const userId = useSelector((state) => state.user.id);
    const token = useSelector((state) => state.user.accessToken);

    const handleSave = (event) => {
        event.preventDefault();

        const offerPayload = {
            town: offerFormValues.town,
            dayCost: parseInt(offerFormValues.dayCost),
            minDays: parseInt(offerFormValues.minDays),
            maxDays: parseInt(offerFormValues.maxDays),
            car: {
                model: carFormValues.model,
                fuel: carFormValues.fuel,
                automatic: carFormValues.automatic === "automatic",
                year: parseInt(carFormValues.year),
            },
            user: {
                id: userId
            }
        }

        postOffer(offerPayload, token).then(res => {
            setOpen(false);
            props.onSaveOffer();
            setCarFormValues(carDefaultValues);
            setOfferFormValues(offerDefaultValues);
        });
    }

    const handleCarInputChange = (e) => {
        const { name, value } = e.target;
        setCarFormValues({
          ...carFormValues,
          [name]: value,
        });
      };

    const handleOfferInputChange = (e) => {
        const { name, value } = e.target;
        setOfferFormValues({
            ...offerFormValues,
            [name]: value,
        });
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} sx={{mt: 4}}>
                Create Offer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Offer</DialogTitle>
                <Divider orientation="horizontal" variant="middle" />
                <DialogContent>
                    <Box>
                        <Typography component="div" variant="h6">
                            Car specifications
                        </Typography>
                        <Grid container spacing={2} sx={{mt: 1}}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    fullWidth
                                    id="model-input"
                                    name="model"
                                    label="Model"
                                    type="text"
                                    value={carFormValues.model}
                                    onChange={handleCarInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth
                                    id="year-input"
                                    name="year"
                                    label="Year"
                                    type="number"
                                    value={carFormValues.year}
                                    onChange={handleCarInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="fuel-simple-select-label">Fuel type</InputLabel>
                                    <Select
                                    labelId="fuel-simple-select-label"
                                    id="fuel-simple-select"
                                    name="fuel"
                                    value={carFormValues.fuel}
                                    label="Fuel type"
                                    onChange={handleCarInputChange}
                                    >
                                        <MenuItem key="PETROL" value="PETROL">Petrol</MenuItem>
                                        <MenuItem key="DIESEL" value="DIESEL">Diesel</MenuItem>
                                        <MenuItem key="LPG" value="LPG">LPG</MenuItem>
                                        <MenuItem key="HYBRID" value="HYBRID">Hybrid</MenuItem>
                                        <MenuItem key="ELECTRIC" value="ELECTRIC">Electric</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="gearbox-simple-select-label">Gearbox</InputLabel>
                                    <Select
                                    labelId="gearbox-simple-select-label"
                                    id="gearbox-simple-select"
                                    name="automatic"
                                    value={carFormValues.automatic}
                                    label="Gearbox"
                                    onChange={handleCarInputChange}
                                    >
                                        <MenuItem key="automatic" value="automatic">Automatic</MenuItem>
                                        <MenuItem key="manual" value="manual">Manual</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>                            
                        </Grid>
                        <Typography component="div" variant="h6" sx={{mt: 2}}>
                            Offer specifications
                        </Typography>
                        <Grid container spacing={2} sx={{mt: 1}}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="town-input"
                                    name="town"
                                    label="Town"
                                    type="text"
                                    value={offerFormValues.town}
                                    onChange={handleOfferInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="day-cost-input"
                                    name="dayCost"
                                    label="Daily cost"
                                    type="number"
                                    value={offerFormValues.model}
                                    onChange={handleOfferInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="min-days-input"
                                    name="minDays"
                                    label="Min days"
                                    type="number"
                                    value={offerFormValues.model}
                                    onChange={handleOfferInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="max-days-input"
                                    name="maxDays"
                                    label="Max days"
                                    type="number"
                                    value={offerFormValues.model}
                                    onChange={handleOfferInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 1}}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}