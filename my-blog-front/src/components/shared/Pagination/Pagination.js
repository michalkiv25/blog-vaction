import React from 'react';
import './Pagination.scss'

export default function Pagination(props) {
    const {nPages ,currentPage, setCurrentPage} = props;

    if(isNaN(nPages) ) { //Checks if the number of pages is NaN, That means there are no pages to flip through
        return;
    };

    const pageNumbers =  [...Array(nPages + 1).keys()].slice(1); // number of pages
    
    const pagePrev = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    };

    const pageNext = () => {
        if(currentPage !== nPages) {
            setCurrentPage(currentPage + 1)
        };
    };

    const clickPage = (pgNumber)=> {
        setCurrentPage(pgNumber);
    };

  return (
    <>
        {!isNaN(nPages) &&
            <nav>
                <ul>
                    <li>
                        <a 
                            href='#'
                            onClick={pagePrev}  
                            className="navigation-button next"   
                            style={{cursor: currentPage === 1 ? 'not-allowed' : 'pointer'}}                         
                            >אחורה</a>
                    </li>
                    { pageNumbers?.map((pgNumber,i)=>(  
                        <li 
                            key={i}
                            className={`page-item ${currentPage === pgNumber ? 'active' : '' }`}
                        >
                            <a onClick={()=> clickPage(pgNumber)} >{pgNumber}</a> 
                        </li>
                    ))}
                    <li >
                        <a 
                            href='#'
                            onClick={pageNext}   
                            className="navigation-button back"
                            style={{cursor: currentPage === nPages ? 'not-allowed' : 'pointer'}}   
                        >קדימה</a>
                    </li>
                </ul>
            </nav>
        }
    </>
  );
};