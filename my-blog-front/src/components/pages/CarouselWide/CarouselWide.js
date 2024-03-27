import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../../shared/Header/Header';
import { setChoosCountry } from '../../../redux/basePageSlice';
import { Config } from '../../../Config';  


export default function CarouselWide(props) {
    const { dataRedax, id } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [isIndex,setIsIndex] = useState(0);
    let numSlides = props.dataRedax.regions.length; 
    const [translateValue,setTranslateValue] = useState((numSlides - 1) * -100);

    const showSlides = (n) => {
        let newIndex = n;
      
        if (n > numSlides) {
          newIndex = 1;
        }
      
        if (n < 1) {
          newIndex = numSlides;
        }
      
        setTranslateValue((newIndex - 1) * 100);
        setIsIndex(newIndex);
      };

    useEffect(()=>{
        showSlides(isIndex);
    },[isIndex,translateValue]);

    // Thumbnail image controls
    const currentSlide = (i)=>{
        setIsIndex(i);
        showSlides(i);
    };

    // Next/previous controls
    const changeSlide =(i)=>{
        setIsIndex(isIndex + i);
        showSlides(isIndex + i);
    };

    const hendelCountry = (item)=>{
        dispatch(setChoosCountry(item));
        navigate(item.countryEng);
    };
    
    const data= dataRedax?.regions.map((item,i) => (
        <div key={i} className='slide' style={{display : isIndex-1 === i ? 'grid': '' }}>
            <h3>{item.country}</h3>
            <button className="link" onClick={()=> hendelCountry(item,i)}>לעבור</button>
        </div>
    ));


  return (
    <div className='weapper-carousel-wide' id={id === 'section-3' ? id : '' }>
        <Header priTitle={"חופשות"} secTitle={"עירוניות"}></Header>
        <section className='grid carousel'>
          {data}
          <button type="button" className="prev" onClick={()=> changeSlide(-1)}>&#10094;</button>
          <button type="button" className="next" onClick={()=> changeSlide(1)}>&#10095;</button>
          <div className="controls">
          {dataRedax.regions.map((item,i)=>
              <button type="button" key={i} className={`dot ${i === isIndex-1 ? 'active' : 'none'}`} onClick={()=> currentSlide((i+1))}></button>
          )}
          </div>
          <div className="slide-photos">
              {dataRedax?.backgroundImage?.map((item,i)=>
                  <div key={i} className="slide-photo" style={{backgroundImage:`url(${Config.baseApiUrl}${item})`,translate:String(translateValue).concat("%")}}></div>
              )}
          </div>
        </section>
    </div>
  )
}