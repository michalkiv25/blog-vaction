import React from 'react';
import { Config } from '../../../Config';  

const ItemAccordion = (props)=>{
    const {
            activeIndex, 
            index, 
            mouseEnter,
            dataRedax,
            titleChange,
            handleClickScroll, 
            onMouseLeave, 
            isContainerActive,
            hendelBurger,
            } = props;

    // const videoUrl = 'https://www.veed.io/embed/fcc2b9c0-a67e-4e7b-b869-a5d67eada399';
    const videoUrl = 'https://www.veed.io/embed/0766c276-472f-4d15-bf5a-295656458d11'
    const title = Array.isArray(dataRedax[index]?.title) ? titleChange : dataRedax[index]?.title; //title on item
    const view = (activeIndex === index) //when the item is opan or close
        ? 
            <div className='text-banner-open'>
                <h2>{title}</h2>
                {/* <svg className='icon-banner'>{dataRedax[i].icon}</svg> */}
            </div>    
        :
            <div className='title-banner-close'>
                {/* <svg className='icon-banner'>{dataRedax[i].icon}</svg> */}
                <h2>{title}</h2>
            </div>

    const imageOrVideo = (dataRedax[index]?.video) // background is image od video
     ?
        <div className='video-item'>
            <div className='container-burger-button'>
                <button type="button" onClick={hendelBurger} className='burger-button'>
                    <span className= {`line1 ${isContainerActive ? 'change' : ''}`}></span>
                    <span className={`line2 ${isContainerActive ? 'change' : ''}`}></span>
                    <span className={`line3 ${isContainerActive ? 'change' : ''}`}></span>
                </button>
            </div>
            {isContainerActive && (
           <div className='menu-mobile'>
                <ul>
                    {dataRedax?.map((item, i) => {
                        if (!Array.isArray(item.title)) {
                            return (
                                <li className='row-mobile' key={i} onClick={() => handleClickScroll(i)}>
                                    <p>{item.title}</p>
                                </li>
                            );
                        };
                        return null;
                    })}
                </ul>
            </div>
            )}
            <h2>{title}</h2>
            <iframe
                src={videoUrl}
                width="50"
                frameborder="0"
                title="00166"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            ></iframe>
        </div>
     :
        <div className='block-image'>
            <div className='image-item' style={{backgroundImage: `url(${Config.baseApiUrl}${dataRedax[index].image})`}}>
            {view}
            </div>
        </div>


    return (
        <li
            onMouseEnter={() => mouseEnter(index)}
            onMouseLeave={() => onMouseLeave(index)}
            onClick={() => !isContainerActive && handleClickScroll(index) }
            className={`wrapper-item ${activeIndex === index && 'open '}`}
        >
            {imageOrVideo}
        </li>
    )
};


export default ItemAccordion