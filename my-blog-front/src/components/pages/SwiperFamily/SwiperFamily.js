
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';

import BoxSwiper from '../SwiperFamily/BoxSwiper';
import Header from '../../shared/Header/Header';


const SwiperFamily= (props) => {
  const {dataRedax, id} = props;

  return (
    <div className='wrapper-swiper-family' id={id === 'section-4' ? id : ''}>
      <Header priTitle={'חופשות'} secTitle={'משפחתיות'}></Header>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 30,
          }
        }}  
      >
        {dataRedax?.regions?.map((item,i)=>{ 
          return (
            <SwiperSlide key={i}>
              <BoxSwiper item={item}></BoxSwiper>
            </SwiperSlide>
        )
        })}
      </Swiper>
    </div>
  )
}

export default SwiperFamily