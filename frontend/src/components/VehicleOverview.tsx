import React, { useState, useEffect } from 'react';
import { getVehicles, deleteVehicle } from '../services/vehicleService.ts';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { buttonStyles, redButtonStyles, tableHeaderStyles, tableCellStyles, tableRowStyles } from "../commonStyles.ts";

const VehicleOverview = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    getVehicles()
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleDelete = (id: number) => {
    deleteVehicle(id)
      .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      })
      .catch(error => console.error('Error deleting vehicle:', error));
  };

  return (
    <div>
    <div className='horizontalLayout'>
       <h1>Vehicle Data</h1>
       <Button 
          variant="contained" 
          sx={buttonStyles}
          href="/add">
        + New
      </Button>
      </div>
      <TableContainer sx={{ pb: 8 }} >
        <Table>
          <TableHead>
            <TableRow sx={tableRowStyles}>
              <TableCell sx={tableHeaderStyles}>ID</TableCell>
              <TableCell sx={tableHeaderStyles}>Model</TableCell>
              <TableCell sx={tableHeaderStyles}>First Registration Year</TableCell>
              <TableCell sx={tableHeaderStyles}>Cubic Capacity</TableCell>
              <TableCell sx={tableHeaderStyles}>Fuel</TableCell>
              <TableCell sx={tableHeaderStyles}>Mileage</TableCell>
              <TableCell sx={tableHeaderStyles}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
          {vehicles.length === 0 ? (
            <TableRow sx={tableRowStyles}>
              <TableCell colSpan={7} align="center" sx={tableCellStyles}>No vehicles available</TableCell>
            </TableRow>
          ) : (
            vehicles.map(vehicle => (
              <TableRow key={vehicle.id} sx={tableRowStyles}>
                <TableCell sx={tableCellStyles}>{vehicle.id}</TableCell>
                <TableCell sx={tableCellStyles}>{vehicle.model}</TableCell>
                <TableCell sx={tableCellStyles}>{vehicle.firstRegistrationYear}</TableCell>
                <TableCell sx={tableCellStyles}>{vehicle.cubicCapacity}</TableCell>
                <TableCell sx={tableCellStyles}>{vehicle.fuel}</TableCell>
                <TableCell sx={tableCellStyles}>{vehicle.mileage}</TableCell>
                <TableCell sx={tableCellStyles}>
                  <Button 
                  onClick={() => handleDelete(vehicle.id)} 
                  sx={redButtonStyles}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VehicleOverview;
