import { useState } from 'react'
import { Header } from '../../components/index'
import { Admin, User } from '../index';

export const Home = () => {
  const [admin, setAdmin] = useState(true);

  return (
    <>
      <Header />
      { admin ? <Admin /> : <User /> }
    </>
  )
}
