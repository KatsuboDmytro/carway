import React from 'react'
import { FindIcon } from '../../assets/assets'
import './find.css';

export const Find = () => {
  return (
    <div className='find'>
      <input type='text' placeholder='Find info' />
      <FindIcon />
    </div>
  )
}
