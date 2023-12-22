import { useNavigate } from 'react-router-dom'
import './departure.css'

export const Departure = ({ id, name, phone, email, route, from, to, admin }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/departure/${id}`, { state: { id, name, phone, email, route, from, to, admin } });
  };

  return (
    <article onClick={handleClick}>{route?.start_location} - {route?.end_location}</article>
  )
}
