import { useState } from 'react';
import { Admin, User } from '../index';

export const Home = () => {
  const [admin, setAdmin] = useState(false);

  return (
    <>
      {admin ? <Admin admin={admin}/> : <User admin={admin}/>}
    </>
  );
};
