import React from 'react';
import './Header.scss';

export default function Header(props) {
  const { priTitle, secTitle } = props;

  const bottomToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className='wrapper-header' onClick={bottomToTop}>
        <h1>{priTitle} <span>{secTitle}</span></h1>
        <hr></hr> 
    </div>
  );
};