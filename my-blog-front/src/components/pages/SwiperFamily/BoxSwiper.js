import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setChoosCountry } from '../../../redux/basePageSlice';
import { Config } from '../../../Config';  


function BoxSwiper(props) {
    const { item } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const hendelCountry = ()=>{
      dispatch(setChoosCountry(item)) //Redux update
      navigate(item.countryEng);
    };

    return (
      <div className='wrapper-box' style={{backgroundImage:`url(${Config.baseApiUrl}${item.image})`}} onClick={ ()=>hendelCountry()}>
          <span>{item.country}</span>
      </div>
    )
}

export default BoxSwiper