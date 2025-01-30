import React, { useState } from 'react';
import { addVehicle } from '../services/vehicleService.ts';
import { Button, TextField } from '@mui/material';
import { SelectChangeEvent } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buttonStyles, inputStyles } from "../commonStyles.ts";

const AddVehicleForm = () => {
  const [vehicle, setVehicle] = useState<{
    model: string;
    fuel: string;
    mileage: number;
    firstRegistrationYear: string;
    cubicCapacity: number;
  }>({
    model: '',
    fuel: '',
    mileage: 0,
    firstRegistrationYear: '',
    cubicCapacity: 0
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === 'mileage' || name === 'cubicCapacity' ? parseInt(value) || 0 : value;

    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: parsedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!vehicle.model) newErrors.model = 'Model is required';
    else if (vehicle.model.length > 40) newErrors.model = 'Model cannot exceed 40 characters';

    if (!vehicle.firstRegistrationYear) newErrors.firstRegistrationYear = 'First registration year is required';
    else if (!/^\d{4}$/.test(vehicle.firstRegistrationYear)) newErrors.firstRegistrationYear = 'Enter a valid 4-digit year';
  
    if (!vehicle.cubicCapacity) newErrors.cubicCapacity = 'Cubic capacity is required';
    else if (vehicle.cubicCapacity < 1000 || vehicle.cubicCapacity > 9999) newErrors.cubicCapacity = 'Cubic capacity must be a 4-digit number';
  
    if (!vehicle.fuel) newErrors.fuel = 'Fuel type is required';
  
    if (!vehicle.mileage) newErrors.mileage = 'Mileage is required';
    else if (vehicle.mileage < 0) newErrors.mileage = 'Mileage must be greater than 0';
    else if (vehicle.mileage > 9999999) newErrors.mileage = 'Mileage cannot exceed 7 digits';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      addVehicle(vehicle)
        .then((response) => {
            toast.success('Vehicle added successfully!');
            setVehicle({
                model: '',
                fuel: '',
                mileage: 0,
                firstRegistrationYear: '',
                cubicCapacity: 0
              }); 
        })
        .catch((error) => {
            toast.error('Error adding vehicle. Please try again.');
            console.error('Error adding vehicle:', error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className='horizontalLayout'>
      <h1>New vehicle</h1>
      <Button
         variant="contained" 
         type="submit"
         sx={buttonStyles} >
          Save
        </Button>
      </div>
      <div className='formLayout'>
        <TextField
          placeholder="Model"
          name="model"
          value={vehicle.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.model}
          helperText={errors.model}
          sx={inputStyles}
        />
         <TextField
          placeholder="First Registration Year"
          name="firstRegistrationYear"
          value={vehicle.firstRegistrationYear}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.firstRegistrationYear}
          helperText={errors.firstRegistrationYear}
          sx={inputStyles}
        />
        <TextField
          placeholder="Cubic Capacity"
          name="cubicCapacity"
          type="number"
          value={vehicle.cubicCapacity || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.cubicCapacity}
          helperText={errors.cubicCapacity}
          sx={inputStyles}
        />
        <TextField
          placeholder="Fuel"
          name="fuel"
          value={vehicle.fuel}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.fuel}
          helperText={errors.fuel}
          sx={inputStyles}
        />
        <TextField
          placeholder="Mileage"
          name="mileage"
          type="number"
          value={vehicle.mileage || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.mileage}
          helperText={errors.mileage}
          sx={inputStyles}
        />
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddVehicleForm;
