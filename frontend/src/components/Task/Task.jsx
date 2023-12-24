import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { No, Yes } from '../../assets/assets';
import './task.css';

export const Task = ({ id, suggest_id, name, phone, email, route, driver, from, to, admin, proposition, flag, setFlag }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/departure/${id}`, { state: { name, phone, email, route, from, to, admin } });
  };
  
  const handleSuccess = async () => {
    try {
      const responseRoute = await axios.put('http://localhost:3006/api/driver', {driver_id: driver?.driver_id});
      console.log('Created new route:', responseRoute.data);
    } catch (error) {
      console.error('Error handling approval:', error);
    }
    try {
      const newRoute = {
        ...route,
        successful: !route.successful,
      };
      console.log('route', newRoute);
      
      const responseRoute = await axios.put(`http://localhost:3007/api/routes/${route?.route_number}`, newRoute);
      console.log('Updated route:', responseRoute.data);
    } catch (error) {
      console.error('Error updating route:', error);
    }    
  };
  
  const handleApprove = async () => {
    setFlag(!flag);
    
    try {
      const responseRoute = await axios.put('http://localhost:3005/api/driver', {driver_id: driver?.driver_id});
      console.log('Created new route:', responseRoute.data);
    } catch (error) {
      console.error('Error handling approval:', error);
    }
    const { suggest_id, ...newRoute } = route;
    const thisRoute = {
      ...newRoute,
      fuel_consumption: '50',
      successful: false,
    };
    
    console.log("🚀 ~ file: Task.jsx:17 ~ handleApprove ~ thisRoute:", thisRoute);
    
    try {
      const responseRoute = await axios.put(`http://localhost:3008/api/routes/${route?.route_number}`, thisRoute);
      console.log('Updated route:', responseRoute.data);
    } catch (error) {
      console.error('Error handling approval:', error);
    }    
    try {
      const responseSugges = await axios.delete('http://localhost:3005/api/suggested_routes', {
        data: { suggest_id }
      });
      console.log('Deleted suggested route:', responseSugges.data);
    } catch (error) {
      console.error('Error handling approval:', error);
    }
  };
  
  const handleDecline = async () => {
    setFlag(!flag);

    try {
      const response = await axios.delete('http://localhost:3005/api/suggested_routes', {
        data: { suggest_id }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting suggested routes:', error);
    }
  };

  return (
    <article className='task' style={{backgroundColor: route?.successful && '#CEE4CD'}}>
      <div onClick={handleClick}>{from} - {to}</div>
      <div className="choose" style={{ display: proposition ? 'block' : 'none' }}>
        <span onClick={handleApprove}><Yes /></span>
        <span onClick={handleDecline}><No /></span> 
      </div> 
      <div className="choose" style={{ display: !proposition && !route?.successful ? 'block' : 'none' }}>
        <span onClick={handleSuccess}><Yes /></span>
      </div> 
    </article>
  );
}
