import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({country}) => {
    const [weatherData, setWeatherData] = useState({})
  
    useEffect(() => {
      const lat = country.capitalInfo.latlng[0]
      const lon = country.capitalInfo.latlng[1]
      const api_key= process.env.REACT_APP_API_KEY
      const url = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + api_key
        axios
        .get(url)
        .then(response => {
          setWeatherData(response.data)
        })
    }, [])
  
    if (Object.keys(weatherData).length > 0) {
      const icon = weatherData.current.weather[0].icon
      const iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      return (
        <>
          <p>temperature {(weatherData.current.temp - 273).toFixed(2)} Celsius</p>
          <img src={iconURL} />
          <p>wind {weatherData.current.wind_speed} m/s</p>
        </>
      )
    }
    else {
      return <></>
    }
}  

export default Weather