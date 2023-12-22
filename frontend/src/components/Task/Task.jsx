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
      const responseRoute = await axios.put('http://localhost:3003/api/routes', {
        route_number: route?.route_number,
      });
      console.log('Created new route:', responseRoute.data);
    } catch (error) {
      console.error('Error handling approval:', error);
    }
  };
  
  const handleApprove = async () => {
    setFlag(!flag);
    const { suggest_id, ...newRoute } = route;
    const thisRoute = {
      ...newRoute,
      fuel_consumption: '50',
      successful: true,
    }
    console.log("🚀 ~ file: Task.jsx:17 ~ handleApprove ~ thisRoute:", thisRoute)

    try {
      const responseRoute = await axios.put('http://localhost:3005/api/driver', {driver_id: driver?.driver_id});
      console.log('Created new route:', responseRoute.data);
    } catch (error) {
      console.error('Error handling approval:', error);
    }
    try {
      const responseRoute = await axios.put('http://localhost:3005/api/routes', thisRoute);
      console.log('Created new route:', responseRoute.data);
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
