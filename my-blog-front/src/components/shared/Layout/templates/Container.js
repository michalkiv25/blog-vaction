
import React from 'react';
import { Outlet } from 'react-router-dom';
import Btn from '../../Button/Btn';

import './Container'



function Container() {
  return (
    <>
        <Btn btnBack={'btnBack'}></Btn> 
        <div className='container'>
            <Outlet/>
        </div> 
    </>
  )
}

export default Container
