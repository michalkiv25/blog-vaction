import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setChoosCountry } from '../../../redux/basePageSlice';
import { Config } from '../../../Config';  



export default function ItemCarousel(props) {
    const { region, setActiveIndex, activeIndex, dataLength ,setCurrentPage } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hendelCountry = ()=>{
      dispatch(setChoosCountry(region));
      navigate(region.countryEng);
    };

    let initialX = null;
    let initialY = null;

  //swipe on screen
  const touchStartOnScreenMobile = (e) => {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };

  const touchMoveOnScreenMobile = (e) => {
    if (initialX === null) return;
    if (initialY === null) return;
    
    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;
   
    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

   
    let isRight = diffX > 0;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (isRight) {  // sliding horizontally
         // swiped right 
          if(activeIndex !== 0 ){
            setActiveIndex(activeIndex - 1);
            setCurrentPage(prevPage => Math.max(0, prevPage - 1));
          } else{
            return  
          }
        } else {
          // swiped left
          if(activeIndex !== dataLength-1){
            setActiveIndex(activeIndex + 1);
            setCurrentPage(prevPage => Math.min(dataLength - 1, prevPage + 1));
          }else {
            return;
          };
        };
      };
      initialX = null;
      initialY = null;
      e.preventDefault();
  };


  return (
    <>
      <div
        className='carousel_cell'
        style={{ backgroundImage: `url(${Config.baseApiUrl}${region.image})`}}
        onClick={ ()=>hendelCountry() }
        onTouchStart={(e) => touchStartOnScreenMobile(e)}
        onTouchMove={(e) => touchMoveOnScreenMobile(e)}
      > 
        <p>{region.country}</p> 
      </div>
    </>
  )
}