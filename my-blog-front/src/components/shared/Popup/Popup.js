import React, {useState,useEffect} from 'react';

    import './Popup.scss';
    import ImageSliderPopup from '../ImageSliderPopup/ImageSliderPopup ';

    
    export default function Popup(props) {

      const {popup, setPopup, src, images} = props;
      const [currentIndex, setCurrentIndex] = useState();

      
      useEffect(()=>{
        const indexfind = images?.findIndex( x => x === src);
        setCurrentIndex(indexfind);

        return()=>{
          setCurrentIndex(0);
        }
      },[src,images])

      
      const onPrev = () => {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
      };
    
      const onNext = () => {
        setCurrentIndex((prevIndex) => Math.min(images.length - 1, prevIndex + 1));
      };

      const closeImage = () => {
          setPopup(false)
      };


      return (
        <>
        {props.popup && 
          <div 
            className="modal" 
            style={{ display : popup ? 'block': 'none'}}
          >
              <ImageSliderPopup
                 images={images}
                 onPrev={onPrev}
                 onNext={onNext}
                 currentIndex={currentIndex}
              ></ImageSliderPopup>
              <span className="close-btn" onClick={closeImage}> &times; </span>
          </div>
        }
        </>
      )
    }