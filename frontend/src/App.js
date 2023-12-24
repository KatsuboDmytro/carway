import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Login, SignUp, Home, AboutDriver, AboutDeparture, Settings } from "./pages/index";

function App() {
  const [driversData, setDriversData] = useState([]);
  const [routesData, setRoutesData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/driver')
      .then(response => {
        setDriversData(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3007/api/routes')
      .then(response => {
        setRoutesData(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/api/vehicles')
      .then(response => {
        setVehiclesData(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/home' element={<Home driversData={driversData} routesData={routesData} />}/>
          <Route path='/about/:id' element={<AboutDriver routesData={routesData}/>} />
          <Route path='/departure/:id' element={<AboutDeparture vehiclesData={vehiclesData} />}/>
          <Route path='/settings/:admin' element={<Settings driversData={driversData} routesData={routesData} vehiclesData={vehiclesData} />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
