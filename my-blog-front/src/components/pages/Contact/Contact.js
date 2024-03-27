import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import {contact} from '../../../redux/basePageSlice';
import {validate} from '../../../helper/helper';
import { Config } from '../../../Config';  


function Contact(props) {
  const dispatch = useDispatch();

  const [checked,setChecked] = useState();
  const [formStatus, setFormStatus] = React.useState('שלח');

  const changhBackgroundColor =(e)=>{
    const checked = e.target.checked; 
    setChecked(checked);
    //   setChangeColor('החלפה לרקע לבן');
    // else 
    //   setChangeColor('החלפה לרקע שחור');
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    const { name, email, number, message } = e.target.elements
    let mes = {
      name: name.value,
      email: email.value,
      number:number.value,
      message: message.value,
    };
    const error = validate(mes);
    if(error) {
      alert(error);
    } else {
      const res = await dispatch(contact(mes));
      if(res.meta.requestStatus.includes('fulfilled')){
        setFormStatus('success')
        name.value = '';
        email.value = '';
        number.value = '';
        message.value = '';
      };
    };
  };


  return ( 
      <div 
        className={`contact-container ${checked ? 'dark' : ''}`}  
        style={{ backgroundColor: checked ? "black" : "#FCFDFD" }}
      >
        <div className="left-col" style={{backgroundImage: `url(${Config.baseApiUrl}${props?.dataRedax?.imageContact})`}}>
        </div>
        <div className="right-col">
            <div className="theme-switch-wrapper">
              <label className="theme-switch" htmlFor="checkbox" onClick={(e)=>changhBackgroundColor(e)}>
                  <input type="checkbox" id="checkbox" />
                  <div className="slider round"></div>
                  <div className="slider-icon">
                  <MdOutlineWbSunny />
                  </div>
                  <div className="slider-icon moon">
                  <BsMoon />
                  </div>
              </label>
            </div>
            <div className='titles-contact'>
              <h1>צור קשר</h1>
              <p> Michalkiv420@gmail.com ניתן למלא טופס לשאלות או לשלוח מייל לכתובת ואחזור אליכם בהקדם.</p>
            </div>
            {formStatus === 'success'? <div className='mes-success'>ההודעה נשלחה</div> :(
             <form method="post" onSubmit={onSubmit}>
              <label htmlFor="name"><InsertEmoticonIcon></InsertEmoticonIcon> שם מלא</label>
              <input type="text" id="name" name="name" required/>
              <label htmlFor="email"><AlternateEmailIcon></AlternateEmailIcon> אימייל</label> 
              <input type="email" id="email" name="email" required/>
              <label htmlFor="number"><PhoneIcon></PhoneIcon>  טלפון</label>
              <input type="number" id="number" name="number" required/>
              <label htmlFor="message"><EmailIcon></EmailIcon> הודעה</label>
              <textarea rows="5" id="message" name="message" required></textarea>
              <button type="submit" id="submit" name="submit">
                {formStatus}
              </button>
            </form>
            )}
        </div>
      </div> 
  );
};


export default Contact