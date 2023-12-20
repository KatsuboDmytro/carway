import { useNavigate } from 'react-router-dom';
import { LogOut, Logo } from '../../assets/assets'
import { Find } from '../index'
import settings from "../../assets/header/settings.svg";
import './header.css';

export const Header = ({ admin, driversData, routesData, driver }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/settings/${admin}`, { state: { admin, driversData, routesData, driver } });
  };
  
  const logOutHandle = () => {
    navigate(`/`);
  };
  return (
    <header className='header'>
      <Logo />
      {admin ? <Find /> : <></>}
      <div className='header__functions'>
        <img src={settings} onClick={handleClick} alt="settings" style={{cursor: 'pointer'}} />
        <div onClick={logOutHandle}><LogOut /></div>
      </div>
    </header>
  )
}
