import React from 'react';

function CountryApi(props) {
  const { weatherData, infoCountry, country, nameArea} = props;
  
  return (
    <div className='component-information'>
      {infoCountry?.capital && 
          <div className='general-information'>
            <h3>{`מידע כללי על ${country}`}</h3>
            <hr></hr>
            <div>{`עיר בירה של ${country}: `}<span>{infoCountry?.capital}</span></div>
            <div>{`יבשת ${country}: `} <span>{infoCountry?.region}   </span></div>
            <div>{`הפרש שעות בין ישראל ל-${country}: `}{infoCountry?.timezones}  </div>
        </div>
        }
      {weatherData &&
        <div className='general-information-city'>
          {nameArea && <h3>{nameArea}</h3>}
              תאריך ושעה כעת: {weatherData.location.localtime}
          <div className='weather-condition'>
            {weatherData.current?.condition.text} <img src={weatherData.current?.condition.icon} alt='Weather' />
          </div>
          <div>
            מזג האויר: {weatherData.current?.temp_c}
            <span>°c</span>
          </div>
          <div className='max-min-temp'>
            <div>
              {Math.round(weatherData.forecast?.forecastday[0]?.day.mintemp_c)}
              <span>°c</span>
            </div> /
            <div>
              <span>°c</span> {Math.round(weatherData.forecast?.forecastday[0]?.day.maxtemp_c)}
            </div>
          </div>
        </div> 
      }
      {/* https://developers.google.com/maps/documentation/embed/embedding-map#adding_the_url_into_an_iframe */}
      {nameArea || country && 
      (<iframe
        title=''
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAtTlXHfFZxnOKBYGL81IS44T05Erbdhbo&q=${nameArea ? nameArea : country}&language=he&zoom=3`}>
      </iframe>)
      }
    </div>  
  )
}

export default CountryApi