import { LogOut, Logo, Settings } from '../../assets/assets'
import { Find } from '../index'
import './header.css';

export const Header = () => {
  return (
    <header className='header'>
      <Logo />
      <Find />
      <div className='header__functions'>
        <Settings />
        <LogOut />
      </div>
    </header>
  )
}
