import React, { useState } from 'react';

import ItemCarousel3D from './ItemCarousel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Header from '../../shared/Header/Header';


export default function WrapperCarousel3D(props) {
    const { dataRedax, id }= props;
    const [activeIndex, setActiveIndex] = useState(0)
    const [current, setCurrent] = useState(0);
    const [angle, setAngle] = useState(0)
    let cellCount = 6;



    const rotateCarousel = (pos) => {
        const angle = pos / cellCount * -360;
        setAngle(angle);
    };

    const hendelBack= ()=>{
        setCurrent(current + 1);
        rotateCarousel(current + 1);
    };

    const hendelNext = ()=>{
        setCurrent(current - 1);
        rotateCarousel(current - 1);
    };

    const styles = {
        carousel:{
            transform:`translateZ(-200px) rotateY(${angle}deg)`,
            transition: 'all 0.75s ease-in-out',
            marginRight: -(activeIndex * 100) + "%" 
        }, 
    };

    const [currentPage, setCurrentPage] = useState(0);


    const renderPaginationPoints = () => {
        const points = [];
        for (let i = 0; i < dataRedax?.regions?.length; i++) {
          points.push(
            <div
              key={i}
              className={`pagination_point ${i === currentPage ? 'active' : ''}`}
            ></div>
          );
        }
        return points;
    };
    

  return (
    <>
        <div className='wrapper-carousel-3D' id={id === 'section-2' ? id : ''}>
            <Header priTitle={'חופשות'} secTitle={'אקזוטיות'}></Header>
            <div className='wrapperCarousel'>
                <div className='carousel' style={styles.carousel}>
                {dataRedax?.regions?.slice().reverse().map((region, i)=>
                    <ItemCarousel3D 
                        key={i} 
                        region={region} 
                        dataLength={dataRedax?.regions?.length} 
                        setActiveIndex={setActiveIndex} 
                        activeIndex={activeIndex} 
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    ></ItemCarousel3D>
                )}
                </div>
                <div className="pagination_points">{renderPaginationPoints()}</div>
            </div>
            <div className='bloc_button'>
                <div>
                    <button type="button" className="btn" onClick={hendelBack}>
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    </button>
                </div>
                <div>
                    <button type="button" className="btn" onClick={hendelNext}>
                        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}