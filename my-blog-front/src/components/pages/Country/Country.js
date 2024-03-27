import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import Pagination from '../../shared/Pagination/Pagination';
import Hotels from '../Hotels/Hotels';
import Popup from '../../shared/Popup/Popup';
import { getCountryDetails, getInformationCountries } from '../../../redux/basePageSlice';
import SlideImage from '../../shared/SlideImage/SlideImage';
import CountryApi from '../CountryApi/CountryApi';


function Country() {
    const dispatch = useDispatch();
    const dataCountry = useSelector((state) => state.blog.dataCountry); // from DB
    const tabs = useSelector((state) => state.blog.tabsCountryRegion);
    const [isIndex,setIsIndex] = useState(0);
    const [isIndexTabsSlice,setIndexTabsSlice] = useState(0);

    const [attractions, setAttractions] = useState(() => {
        if (dataCountry?.areas) {
            if(dataCountry?.areas[0]?.attractions?.length < 1){
                return` אין אטרקציות זמינות ב${dataCountry?.areas[0].area}`;
            }
            return dataCountry?.areas[0]?.attractions;
        } else {
            if(dataCountry?.attractions.length < 1) {
                return` אין אטרקציות זמינות ב- ${dataCountry.country}`;
            }
            return dataCountry?.attractions?.map((attraction, i) => (
                <li key={i}>{attraction}</li>
            ));
        }
    });

    let videos;
    if (dataCountry?.video?.length < 1 || dataCountry?.video === undefined) {
        videos = <li>אין ווידאו זמין</li>;
    } else {
        videos = dataCountry?.video?.map((video, i) => (
            <li className='hover01 column' key={i} i={i} >
                <div>
                    <iframe
                        src={video}
                        frameBorder="0"
                        title={`video-${i}`}
                        allowFullScreen
                        width='100%'
                        height='350px'
                    ></iframe>
                </div>
            </li>
        ));
    };

    const renderHotels = (hotelsData) => { 
        if(hotelsData?.length < 1 || hotelsData === undefined) {
            return <div>אין מלונות זמינים</div>
        }else {
            return hotelsData?.map((hotel, i) => {
              const hotelName = hotel?.nameHotel; // Get the hotel's name
              return (
                <div className='box' key={i}>
                  <div onClick={() => clickHotel(hotel)} style={{ backgroundImage: `url(${hotel?.imageHotel[0]})` }}>
                  </div>
                  <h3>{hotelName}</h3>
                </div>
              );
            });
        };
    };
      
    let dataHotels;
    if (dataCountry?.areas) {
    dataHotels = dataCountry?.areas[0]?.hotels;
    } else {
    dataHotels = dataCountry?.hotels;
    };

    const [hotels, setHotels] = useState(renderHotels(dataHotels));
    const [images,setImages] = useState();
    const [weatherData, setWeatherData] = useState(null);// Data for API
    const [infoCountry,setInfoCountry] = useState(null);
    const [nameArea, setNameArea] = useState(
        dataCountry?.areas ? dataCountry?.areas[0]?.area : null
    );

    const [src,setSrc] = useState();   //pop-up
    const [popup, setPopup] = useState(false); //pop-up

    const initialState = {
        details: undefined,
        isDetailsImage: false,
        isStoryOurTrip: false,
        isDetailsCountry: true,
        isPagination: false,
    };
    const [state, setState] = useState(initialState); 
    const [isComponentHotel,setIsComponentHotel] = useState(false);


    //Pagination
    const [currentPage, setCurrentPage] = useState(1); // User is currently on this page
    const [recordsPerPage] = useState(14); //numberPerPage - No of Records to be displayed on each page  
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = images?.slice(indexOfFirstRecord, indexOfLastRecord); //Records to be displayed on the current page
    const numberOfPages  = Math.ceil(images?.length / recordsPerPage);

    const clickAreas = (val, i) => {
        // Declare variables
        let attractions;
        let hotelsData;
        let images;
        setNameArea(val.area);
        // Check for attractions
        if (val?.attractions?.length < 1 || val?.attractions === undefined) {
            attractions = <li>{`אין אטרקציות זמינות ב ${val.area}`}</li>;
        } else {
            attractions = val?.attractions?.map((item, i) => (
            <li key={i}>{item}</li>
            ));
        }

        // Check for hotels
        if (val?.hotels?.length < 1 || val?.hotels === undefined) {
            hotelsData = <div>{`אין מלונות לתצוגה ב ${val.area}`}</div>;
        } else {
            hotelsData = val?.hotels?.map((hotel, i) => (
            <div className='box' key={i} onClick={() => clickHotel(hotel)}>
                <div style={{ backgroundImage: `url(${hotel?.imageHotel[0]})` }}></div>
                <h3>{hotel?.nameHotel}</h3>
            </div>
            ));
        }

        // Check for images
        if (val?.images?.length < 1 || val?.images === undefined) {
            images = <li>{`אין תמונות לתצוגה באזור ${val.area}`}</li>;
        } else {
            images = val?.images?.map((image, i) => (
            <li key={i} i={i}>
                <div>
                <figure>
                    <img alt="img" src={image} onClick={(e) => bigImagePopUp(e)} i={i} />
                </figure>
                </div>
            </li>
            ));
        }

        // Set state variables
        setAttractions(attractions);
        setHotels(hotelsData);
        setImages(images);

        // Set other state variables
        setIsIndex(i);
        setIndexTabsSlice(0);
        setIsComponentHotel(false);


        // Reset properties in the state
        const resetProperties = {
            details: [],
            isDetailsImage: false,
            isDetailsHotels: false,
            isDetailsCountry: true,
            isPagination: false,
            isStoryOurTrip: false,
        };

        setState((prevState) => ({
            ...prevState,
            ...resetProperties,
        }));
    };

    const clickTav = (val, i) => { // no area
        setIsIndex(i);
        updateState(val)
    };

    const clickTabsSlice = (val, i) => {
        setIndexTabsSlice(i);
        updateState(val) 
    };

    const updateState = (val)=>{
        const resetProperties = {
            details: [],
        };
        
        setState((prevState) => ({
            ...prevState,
            ...resetProperties,
        }));
        
        const setDetailsByType = (data, isImage = false, isHotels = false, isCountry = false, isPagination = false,  isStory= false) => {
            setIsComponentHotel(false);
            setState((prevState) => ({
            ...prevState,
            details: data,
            isDetailsImage: isImage,
            isDetailsHotels: isHotels,
            isDetailsCountry: isCountry,
            isPagination : isPagination,
            isStoryOurTrip:isStory
            }));
        };

        const typeMap = {
            'מידע על המדינה' : () => setDetailsByType( '',false,false,true),
            'בתי מלון שביקרנו': () => setDetailsByType('',false, true),
            'אטרקציות מרכזיות': () => setDetailsByType(attractions),
            'תמונות מהטיול': () => setDetailsByType(currentRecords, true,false,false,true),
            'סיפור הטיול שלנו': () => setDetailsByType('',false, false, false, false, true),
            'סרטונים': () => setDetailsByType(videos, true),
        };
        typeMap[val]?.(); 
    };

    const bigImagePopUp = (e)=>{
        setSrc(e.target.src);
        setPopup(true);
    };

    function clickHotel(infoHotel){
        setIsComponentHotel(true);
        setState((prevState) => ({
          ...prevState,
          dataHotel: infoHotel,
          details:'',
          isDetailsHotels:false
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            let countryEngforAPI;
            if(dataCountry.areas.length > 0) {
                countryEngforAPI = dataCountry.areas[isIndex]?.countryEng;
            }else {
                countryEngforAPI = dataCountry?.countryEng
            };
            try {
                const res = await dispatch(getCountryDetails(countryEngforAPI));
                if (res.payload?.mes) {
                const { location, current, forecast } = res.payload.mes;
                setWeatherData({ location, current, forecast });
                } else {
                toast.warning(` לא בוצע הבאת מידע עבור המדינה:${countryEngforAPI} עבור מזג אוויר`, { position: toast.POSITION.TOP_LEFT });
                };
                const resinfo = await dispatch(getInformationCountries(dataCountry.countryEng));
                if(resinfo.payload) {
                    const {capital, region, timezones} = resinfo.payload;
                    setInfoCountry({capital, region, timezones})
                }else {
                    toast.warning(`לא בוצע הבאת מידע עבור העיר בירה, אזור, וזמן`, { position: toast.POSITION.TOP_LEFT });
                };
            } catch (error) {
                toast.error('Error fetching data', error, { position: toast.POSITION.TOP_CENTER });
            };
        };
        fetchData();
    }, [dataCountry,isIndex]);

    useEffect(()=> {
        let dataImage;
        let data
        if(dataCountry.areas.length > 0) {
            dataImage=dataCountry.areas[0].images.length;
            data = dataCountry.areas[0].images;
        }else {
            dataImage= dataCountry?.images?.length;
            data = dataCountry?.images;
        }
        if(dataImage > 1) {
            const imagesToDisplay = data?.map((image,i) => (
                <li key={i} i={i}>
                    <div>
                        <figure>
                            <img alt="img" src={image} onClick={(e)=>bigImagePopUp(e)} i={i}/> 
                        </figure>
                    </div>
                </li>
            ));
            setImages(imagesToDisplay );
            if(state.isDetailsImage){
                setState((prevState) => ({
                    ...prevState,
                    details: currentRecords,
                }));
            };
        }
        else {
            const mesImage = <li>אין תמונות לתצוגה</li>
            setImages(mesImage );
        };
    },[currentPage]);

    return (
        <div className='description-country'>
            <div className='container-page'>
                <div className='wrapper-header'>
                    <SlideImage imagePage={dataCountry.imagePage}></SlideImage>
                    <h3>{dataCountry?.country}</h3> 
                </div>
                <div className={`tabs ${dataCountry.areas.length > 0 && 'tabs-areas-mobile'}`}>
                    <ul>
                        {(dataCountry?.areas.length > 0 ? dataCountry.areas : tabs).map((item, i) => (
                            <li
                                key={i}
                                className={`${isIndex === i ? 'active' : ''} `}
                                onClick={() => (dataCountry.areas.length > 0 ? clickAreas(item, i) : clickTav(item, i))}
                            >
                                {dataCountry.areas.length > 0 ? item.area : item}
                            </li>
                        ))}
                    </ul>
                </div>
                {dataCountry.areas.length > 0 && (       
                    <div className='tabs-slice'>
                        <ul className='slice-mobile'>
                            {tabs.map((item,i)=> (
                            <li 
                                key={i} 
                                className={`${isIndexTabsSlice === i ? 'active': '' }`} 
                                onClick={() => clickTabsSlice(item, i) }
                            >
                                {item}
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className={`warpper-content ${dataCountry.areas.length > 0 && 'tabs-warpper-content'}`}>
                    <ul className={`content 
                        ${state.isDetailsImage && 'list-image-video'}
                        ${state.details === undefined || state.details === ''? 'none-display' : ''}`}
                    >
                        {state.details}
                    </ul>
                    {(state.isDetailsImage && state.isPagination) && <Pagination nPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                    {state.isStoryOurTrip && <div className='story-our-trip'>{dataCountry.storyOfOurTrip === undefined ? 'אין תצוגה זמינה ' : dataCountry.storyOfOurTrip}</div>}
                    {state.isDetailsHotels && <div className='list-hotels'>{hotels}</div>}
                    {isComponentHotel && (
                        <Hotels
                        dataHotel={state.dataHotel}
                        setIsComponentHotel={setIsComponentHotel}
                        setState={setState}
                        />
                    )}
                    {state.isDetailsCountry && 
                        <CountryApi 
                        weatherData={weatherData} 
                        infoCountry={infoCountry} 
                        country={dataCountry?.country}
                        nameArea={nameArea}
                        >
                        </CountryApi>
                    }
                    <Popup 
                        src={src} 
                        setPopup={setPopup} 
                        popup={popup}  
                        images={dataCountry.areas.length > 0 ? dataCountry?.areas[isIndex].images: dataCountry?.images}
                    >
                    </Popup>
                </div>
            </div>
            <ToastContainer  
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> 
        </div>
        
    )
}

export default Country