import { LogOut, Logo, Settings } from '../../assets/assets'
import { Find } from '../index'
import './header.css';

export const Header = ({ isUser }) => {
  return (
    <header className='header'>
      <Logo />
      {isUser ? <Find /> : <></>}
      <div className='header__functions'>
        {isUser ? <Settings /> : <></>}
        <LogOut />
      </div>
    </header>
  )
}
