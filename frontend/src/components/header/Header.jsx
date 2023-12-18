import { useNavigate } from 'react-router-dom';
import { LogOut, Logo } from '../../assets/assets'
import { Find } from '../index'
import settings from "../../assets/header/settings.svg";
import './header.css';

export const Header = ({ isUser, driversData, routesData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/settings`, { state: { driversData, routesData } });
  };
  return (
    <header className='header'>
      <Logo />
      {isUser ? <Find /> : <></>}
      <div className='header__functions'>
        {isUser ? <img src={settings} onClick={handleClick} alt="settings" /> : <></>}
        <LogOut />
      </div>
    </header>
  )
}
