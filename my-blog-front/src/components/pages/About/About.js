import React, {useState} from 'react';

// import Avatar from '@mui/material/Avatar';
import Header from '../../shared/Header/Header';


export default function About(props) {
    const [isHoverTextPar1, setisHoverTextPar1] = useState(false);
    const [isHoverTextPar2, setisHoverTextPar2] = useState(false);

    return (
        <div className='wrapper-about' id={props.id === 'section-1' ? props.id : '' }>
         <Header priTitle={'קצת'} secTitle={'עלי'}></Header>
            <div className='wrapper-about-images'>
                <div className='background' style={{backgroundImage:"url('https://ik.imagekit.io/myBlog/%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94/DSC08615.JPG?updatedAt=1681150922200')"}}></div>
                <div className="background image-blackwhite-text" 
                     style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 1),rgba(0, 0, 0, 0.1)),
                        url('https://ik.imagekit.io/myBlog/%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94/DSC08615.JPG?updatedAt=1681150922200')`
                     }}
                >
                    <div className='wrapper-par'>
                        <h1>"כל המתנות זה כלום דבר, כסף נגמר, בגד נקרע, צעצועים נשברים, אבל חוויות נשארות בזיכרון, כלומר לא הולכת לאיבוד כמו מתנות אחרות, את הגוף היא עוזבת כל כך מהר אבל את הזיכרון, כל כך לאט."</h1>
                        <div className='par' >
                            <p className={isHoverTextPar1 ? 'textChange' : '' }>
                                שלום,
                                שמי מיכאלה נעם.
                                בעיסוקי אני מפתחת תוכנה, ויחד עם זאת משלבת את תחביבי, לטייל ולחוות עולם :)
                            </p>
                        </div>
                        <div className='par' >
                            <p className={isHoverTextPar2 ? 'textChange' : '' }>
                                הקמתי בלוג, שמתאר את 2 הדברים שאני הכי אוהבת לעשות, לפתח ולטייל בעולם
                                ,ניתן לצפות בתמונות, מיעדים שביקרנו בהם ביחד כזוג וכמשפחה, לקבל המלצות למלונות שביקרנו בהם עם אזורים ממולצים לשהות, אטרקציות שעשינו וכו'
                                טיפים ולשלוח לי מייל עם שאלות רלוונטית. 
                                
                            </p>
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    )
}