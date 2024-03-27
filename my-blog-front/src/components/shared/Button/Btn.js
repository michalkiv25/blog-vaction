import React from 'react';
import {useNavigate} from 'react-router-dom';

import './Button.scss'


function Btn(props) {
  const navigate = useNavigate();
  if(props.btnBack){
    return (
      <button type='button' className='button-home-page' onClick={()=>navigate('/')}>חזור</button>
    )
  } else if (props.btn) {
    return (
      <button type='button' className='button-general' onClick={props.onclick}>{props.text}</button>
    )
  }
};

export default Btn;