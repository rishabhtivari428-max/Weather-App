import React from 'react'
import { useState } from 'react'
import { Search } from 'lucide-react'
import axios from 'axios'

const Weather = () => {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState(null);

  const getWeather = async()=> {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`);
      setweather(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='h-screen bg-violet-300 justify-center items-center flex'>
      <div className='bg-violet-800 text-white p-6 w-80 rounded'>
        <h1 className='font-bold text-center'>Weather App</h1>
        <div className='flex justify-center gap-2 mt-2'>
        <input type="text"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          placeholder='Enter City'
          className='mt-4 text-black px-2 rounded h-8'
        />
        <button onClick={getWeather} className='ml-4'><Search size={20} /></button>
        </div>
        <>
        {weather && (
          <div className='mt-6 text-center font-bold'>
            <h1>{weather.name}</h1>
            <p>{weather.main.temp}C</p>
            <p>{weather.main.humadity}%</p>
            <p>{weather.wind.speed} km/h</p>
            <p className='capitalize'>{weather.weather[0].description}</p>
          </div>
        )}
        </>
      </div>
    </div>
)}

export default Weather



