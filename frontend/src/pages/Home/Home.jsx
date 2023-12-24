import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Admin, User } from '../index';

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
