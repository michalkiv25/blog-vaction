import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Pagination from '../../shared/Pagination/Pagination';
import Popup from '../../shared/Popup/Popup';
import Btn from '../../shared/Button/Btn';

export default function Hotels(props) {
  const { 
    dataHotel, 
    setIsComponentHotel,
    setState, 
  } = props;

  const tabs = useSelector((state) => state.blog.tabsHotels);
  const [isIndex,setIsIndex] = useState(0);

  const [src,setSrc] = useState();
  const [popup, setPopup] = useState(false);

  const linkHotel = <a rel="noreferrer" target='_blank' href={dataHotel.linkHotel}>{dataHotel.linkHotel}</a>;

  const informationHotel = dataHotel.informationHotel === undefined ? 'מידע חסר' : dataHotel.informationHotel;

  const initialState = {
    detailsHotel: linkHotel,
    isDetailsImage: false,
    isLinkHotel: true 
  };

  const [stateHotel,setStateHotel] = useState(initialState); 

  const bigImagePopUp = (e)=>{
    setSrc(e.target.src);
    setPopup(true);
  };

  const imageHotel = dataHotel.imageHotel.map((img, i) => (
    <li key={i}>
      <img src={img} alt={`Img${i}`} onClick={(e)=>bigImagePopUp(e)}/>
    </li>
  ));

  //Pagination
  const [currentPage, setCurrentPage] = useState(1); // User is currently on this page
  const [recordsPerPage] = useState(14); //numberPerPage - No of Records to be displayed on each page  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = imageHotel?.slice(indexOfFirstRecord, indexOfLastRecord); //Records to be displayed on the current page
  const numberOfPages  = Math.ceil(imageHotel?.length / recordsPerPage);

  const backListHotels= ()=> {
      setIsComponentHotel(false);
      setState((prevState) => ({
        ...prevState,
        isDetailsHotels: true,
        details: ''
      }));
  };

  const clickTav = (val, i) => {
    setIsIndex(i);
    const resetProperties = {
      detailsHotel: [],
    };
  
    setStateHotel((prevState) => ({
        ...prevState,
        ...resetProperties,
    }));

    const setDetailsByType = (data, isImage = false, isLink = false) => {
      setStateHotel((prevState) => ({
      ...prevState,
      detailsHotel: data,
      isDetailsImage: isImage,
      isLinkHotel: isLink 
      }));
    };

    const typeMap = {
      'לינק למלון': () => setDetailsByType( linkHotel,false,true),
      'מידע חיוני על המלון': () => setDetailsByType(informationHotel),
      'תמונות מהמלון': () => setDetailsByType(currentRecords,true),
    };
    typeMap[val]?.(); 
  };

  return (
    <div className='component-hotels'>
        <Btn onclick={backListHotels} text='חזרה לרשימת המלונות' btn='btn'></Btn>
        <h5>{dataHotel.nameHotel}</h5>
        <div className='tabs'>
          <ul>
            {tabs.map((item,i)=> (
              <li 
                key={i} 
                className={`${isIndex === i ? 'active': '' }`} 
                onClick={() => clickTav(item, i)} 
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className='tab-content'>
          <ul 
          className={`
          ${stateHotel.isDetailsImage ? 'list-image' : ''} 
          ${stateHotel.isLinkHotel ? 'link-hotel' : ''}
          `}>
              {stateHotel.detailsHotel}
          </ul>
          {stateHotel.isDetailsImage && numberOfPages > 1 &&
          <Pagination
              nPages={numberOfPages} 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage}
          >
          </ Pagination>
          }
          {stateHotel.isLinkHotel && <div className='link'>{stateHotel.detailsHotel}</div>}
        </div>
        <Popup 
          src={src} 
          setPopup={setPopup} 
          popup={popup}         
          images={dataHotel.imageHotel}
        ></Popup>
    </div>
  )
}