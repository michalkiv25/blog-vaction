import React,{useState, useEffect} from 'react'

function SlideImage(props) {
    const {imagePage} = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePage.length);
          }, 1000); // Wait for 500 milliseconds (adjust as needed)
        }, 7000); // Change image every 5 seconds (adjust the interval as needed)

      }, [imagePage]);

  return (
    <div       
        className='background-page-header'
        style={{ backgroundImage: `url(${imagePage[currentIndex]}) `}}
    >
    </div>
  )
}

export default SlideImage