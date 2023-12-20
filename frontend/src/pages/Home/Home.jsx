import { useEffect, useState } from 'react';
import { Admin, User } from '../index';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const Home = ({ driversData, routesData }) => {
  const { state } = useLocation();
  const data = state?.data || {};
  const admin = state?.admin || false;
  const [driverData, setDriverData] = useState([]);
  
  useEffect(() => {
    axios.put('http://localhost:3002/api/driver', data)
    .then(response => {
      setDriverData(response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }, []);

  return (
    <>
      {admin ? (
        <Admin driversData={driversData} admin={admin} />
      ) : (
        <User driver={driverData[0]} routesData={routesData} admin={admin} />
      )}
    </>
  );
};
