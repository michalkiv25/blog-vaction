import React from 'react';


export default function ImageSliderPopup(props) {
    const { onPrev, currentIndex, onNext, images } = props;
    const isDisabledBack = currentIndex === 0;
    const isDisabledNext = currentIndex === images?.length - 1;

    if (!images || images.length === 0 || currentIndex < 0 || currentIndex >= images.length) {
        return <div>התמונות לא זמינות</div>;
    }

    const svgIconNext = (
        <svg 
            className={isDisabledBack && 'svg-disabled' }
            width="35"
            height="35"     
            fill={isDisabledBack ? '#A9A9A9' : 'white'}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 32 32">
            <g data-name="91-Arrow Left">
                <path d="M16 32a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm0-30a14 14 0 1 0 14 14A14 14 0 0 0 16 2z"/>
                <path d="m18.29 24.71-8-8a1 1 0 0 1 0-1.41l8-8 1.41 1.41L12.41 16l7.29 7.29z"/>
            </g>
        </svg>

        //path first- draw a circle
        //path two - draw an arrow
    );

    const svgIconBack = (
    <svg 
    className={isDisabledNext && 'svg-disabled' }
    width="35"
        height="35"     
        fill={isDisabledNext ? '#A9A9A9' : 'white'}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 32 32">
        <g data-name="92-Arrow Right">
            <path d="M16 32a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm0-30a14 14 0 1 0 14 14A14 14 0 0 0 16 2z"/>
            <path d="M13.71 24.71 12.3 23.3l7.29-7.3-7.3-7.29L13.7 7.3l8 8a1 1 0 0 1 0 1.41z"/>
        </g>
    </svg>
    );
  return (
    <div className="image-slider">
            <button onClick={onNext} disabled={isDisabledNext} >
            {svgIconBack}
        </button>
        <img src={images[currentIndex]} alt={`img-${currentIndex}`} />
        <button onClick={onPrev} disabled={isDisabledBack}>
            {svgIconNext}
        </button>
    </div>
  )
}