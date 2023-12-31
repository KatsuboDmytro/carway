import { useNavigate } from 'react-router-dom'
import './driver.css'

export const Driver = ({ id, name, phone, email, busy, admin }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/about/${id}`, { state: { name, phone, email, busy, admin } });
  };

  return (
    <article onClick={handleClick}>{name}</article>
  );
};
