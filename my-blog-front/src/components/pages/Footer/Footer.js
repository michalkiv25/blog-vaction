import React from 'react';

export default function Footer() {
    // const wave = [1,2,3,4].map((item,i)=>
    //     <div key={i} className={wave wave${item}}></div>
    // )

    // const itemMenu = ['facebook','instagram'].map((item,i)=>
    //     <a href="#" target="_blank" key={i}>
    //         <li className={icon ${item}}>
    //         <span className="tooltip">{item}</span>
    //         <span><i className={fa fa-${item}}></i></span>
    //         </li>
    //     </a>
    // )

    const listMenus = [
        { name: "facebook", url: "https://www.facebook.com/?locale=he_IL" },
        { name: "instagram", url: "https://www.instagram.com" },
      ];

    const menu = listMenus.map((item,i)=>
        <a href={item.url} target="_blank" key={i} rel="noreferrer">
            <li className={`icon ${item.name}`}>
                <span className="tooltip">{item.name}</span>
                <span>
                    <i className={`fa fa-${item.name}`}></i>
                </span>
            </li>
        </a>
    );

  return (
    <footer >
        <div className="waves">
            {/* {wave} */}
        </div>
        <ul className="wrapper-menu">
            {menu}
        </ul>
        <p>Made with 🤍 by Michaela Noam</p>
    </footer>
  )
};