import React from 'react'
import { useNavigate } from 'react-router-dom';
import { No, Yes } from '../../assets/assets';
import './task.css';

export const Task = ({ id, name, phone, email, route, from, to, admin, proposition }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/departure/${id}`, { state: { name, phone, email, route, from, to, admin } });
  };

  return (
    <article className='task'>
      <div onClick={handleClick}>{from} - {to}</div>
      <div className="choose" style={{ display: proposition ? 'block' : 'none' }}>
        <span><Yes /></span>
        <span><No /></span> 
      </div> 
    </article>
  );
}
