import React, { useState } from 'react';
import { Admin, User } from '../index';

export const Home = ({ driversData }) => {
  const [admin, setAdmin] = useState(true);
  //const [adminData, setAdminData] = useState([]);
  //console.log("🚀 ~ file: Home.jsx:8 ~ Home ~ adminData:", adminData)
  // useEffect(() => {
  //   axios.get('http://localhost:3001/api/admin')
  //     .then(response => {
  //       setAdminData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error.message);
  //     });
  // }, [admin]);

  return (
    <>
      {admin ? <Admin driversData={driversData} admin={admin} /> : <User admin={admin} />}
    </>
  );
};

