import React, {useState, useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Accordion from '../Accordion';
import About from '../About';
import Carousel3D from '../Carousel3D';
import CarouselSingleScreen from '../CarouselWide';
import Contact  from '../Contact';
import Footer from '../Footer';
import SwiperFamily from '../SwiperFamily';
import Loader from '../../shared/Loader/Loader';
import { setIndexScroll } from '../../../redux/basePageSlice';


const Home = ()=>{
    const [isHeaderSmall, setIsHeaderSmall] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useDispatch();
    const dataRedax = useSelector((state) => state?.blog?.data);
    const indexScroll = useSelector((state) => state?.blog?.indexScroll);
    const [isContainerActive, setIsContainerActive] = useState(false);


    useEffect(() => {
      let timeoutId;
      const handleScroll = () => {
          clearTimeout(timeoutId);
  
          timeoutId = setTimeout(() => {
              const currentScrollY = window.scrollY;
              setIsHeaderSmall(currentScrollY >= 20);
          }, 200);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

    const handleClickScroll = async (index) => {
      await dispatch(setIndexScroll(index));
      const element = document.getElementById(`section-${index}`);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      };
    };

    return (
        <>
          {dataRedax?.length < 1 || dataRedax === undefined
          ? (<Loader isLoading={true}></Loader>)
          : (<>
              <Accordion 
                dataRedax={dataRedax} 
                setActiveIndex={setActiveIndex} 
                activeIndex={activeIndex} 
                isHeaderSmall={isHeaderSmall} 
                handleClickScroll={handleClickScroll}
                isContainerActive={isContainerActive}
                setIsContainerActive={setIsContainerActive}
                >
              </Accordion>
              <About id={`section-${indexScroll}`} isHeaderSmall={isHeaderSmall}></About> 
              <Carousel3D id={`section-${indexScroll}`} dataRedax={dataRedax[2]}></Carousel3D>
              <CarouselSingleScreen id={`section-${indexScroll}`} dataRedax={dataRedax[3]}></CarouselSingleScreen>
              <SwiperFamily id={`section-${indexScroll}`} dataRedax={dataRedax[4]}></SwiperFamily>
              <Contact  dataRedax={dataRedax[0]}></Contact>
              <Footer></Footer>
            </>)
          }
        </>
    );
};

export default Home;