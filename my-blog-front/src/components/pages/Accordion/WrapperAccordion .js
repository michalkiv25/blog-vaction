import React, {useState, useEffect} from 'react';
import ItemAccordion from './ItemAccordion';

const WrapperAccordion = (props)=>{
    const {
        isHeaderSmall, 
        data, 
        dataRedax, 
        activeIndex, 
        setActiveIndex, 
        handleClickScroll,
        setIsContainerActive,
        isContainerActive
    }= props;
    
    const [activeIndexTitleFirstItem, setActiveIndexTitleFirstItem] = useState(0);
    const [titleChange, setTitleChange]= useState(dataRedax[activeIndex]?.title[activeIndex]);

    useEffect(()=>{
        let interval;
        const lengthTitlesArray = dataRedax[0]?.title?.length === undefined ? 5 : 5;
            interval = setInterval(() => {
                setActiveIndexTitleFirstItem((activeIndexTitleFirstItem + 1) % lengthTitlesArray);
                setTitleChange((dataRedax[0]?.title[(activeIndexTitleFirstItem)]));
            },1500)
        return () => clearInterval(interval);
    },[activeIndexTitleFirstItem]);


    // 2 functions When is the banner open and when is it closed?
    const mouseEnter = (i)=>{
        setActiveIndex(i); 
    };

    const onMouseLeave = (i) => {
        setActiveIndex(0); 
    };

    //  Toggle burger
    const hendelBurger= ()=>{
        setIsContainerActive(!isContainerActive);
    };

    const items = dataRedax?.map((item, index) => 
        <ItemAccordion npm 
            item={item}
            key= {index} 
            activeIndex={activeIndex} 
            index={index} 
            data={data}
            dataRedax={dataRedax}
            mouseEnter= {mouseEnter} 
            onMouseLeave={onMouseLeave}
            titleChange={titleChange}
            handleClickScroll={handleClickScroll}
            isHeaderSmall={isHeaderSmall}
            isContainerActive={isContainerActive}
            hendelBurger={hendelBurger}
        >
        </ItemAccordion>
    );
    
    return (
        <div className={` wrapper-accordion ${isHeaderSmall? 'headerSmall': null}`}>
            <ul className={`${isHeaderSmall? 'headerSmall': null} `}>
                {items}
            </ul>
         </div>
    )

};


export default WrapperAccordion