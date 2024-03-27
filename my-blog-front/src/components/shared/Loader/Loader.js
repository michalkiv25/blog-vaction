import React from 'react';
import { Watch } from  'react-loader-spinner';
import './Loader.scss';

function Loader(props) {
  return (
    <>
        {
            props.isLoading && 
            <div className='Loader'>
                <Watch
                    visible={true}
                    height="80"
                    width="80"
                    radius="48"
                    color="#000"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass="icon-loading"
                />
            </div>
        }
    </>
 )
}

export default Loader