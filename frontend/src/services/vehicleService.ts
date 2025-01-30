import axios from 'axios';

const API_URL = 'http://localhost:8080/vehicles';

export const getVehicles = async () => {
  return axios.get(API_URL);
};

export const addVehicle = async (vehicle: any) => {
  return axios.post(API_URL, vehicle);
};

export const deleteVehicle = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};
