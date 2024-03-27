import React,{useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './sass/Site.scss';
import AppRoutes from './routes/appRoutes';
import { getData } from './redux/basePageSlice';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getData());
        if (!res.payload && !res.payload.message) {
          toast.warning('Warning Notification !', { position: toast.POSITION.TOP_LEFT });
          
        };
      } catch (error) {
        toast.error('Error fetching data- GET DATA', error, { position: toast.POSITION.TOP_CENTER });
      };
    };
    fetchData();
  }, []);

  const dataCountry = useSelector((state) => state?.blog?.dataCountry); // DATA from DB

  return (
        <BrowserRouter>
            <AppRoutes dataCountry={dataCountry ? dataCountry.countryEng : null}/>
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
        </BrowserRouter>
  );
}

export default App;