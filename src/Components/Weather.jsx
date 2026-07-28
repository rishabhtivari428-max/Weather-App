import React, { useState } from 'react'
import { Search, Droplets, Wind, Thermometer, Gauge, Sun, Cloud, CloudRain, CloudDrizzle, CloudLightning, Snowflake, CloudFog, Loader2, AlertCircle } from 'lucide-react'
import axios from 'axios'

const Weather = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const getWeather = async () => {
    if (!city.trim()) return
    setLoading(true)
    setError("")

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${import.meta.env.VITE_APP_ID}&units=metric`
      )
      setWeather(response.data)
    } catch (err) {
      console.error(err)
      if (err.response && err.response.status === 404) {
        setError("City not found. Please try again.")
      } else {
        setError("Failed to fetch weather. Please try again.")
      }
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWeather()
    }
  }

  const getWeatherIcon = (mainCondition) => {
    switch (mainCondition?.toLowerCase()) {
      case 'clear':
        return <Sun className="w-14 h-14 text-amber-400" />
      case 'clouds':
        return <Cloud className="w-14 h-14 text-slate-300" />
      case 'rain':
        return <CloudRain className="w-14 h-14 text-sky-400" />
      case 'drizzle':
        return <CloudDrizzle className="w-14 h-14 text-sky-300" />
      case 'thunderstorm':
        return <CloudLightning className="w-14 h-14 text-amber-400" />
      case 'snow':
        return <Snowflake className="w-14 h-14 text-blue-200" />
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudFog className="w-14 h-14 text-slate-300" />
      default:
        return <Sun className="w-14 h-14 text-amber-400" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/40">
        <h1 className="text-xl font-bold text-slate-100 text-center mb-5 tracking-tight">
          Weather App
        </h1>
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter city..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={getWeather}
            disabled={loading || !city.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all shadow-sm flex items-center justify-center"
            aria-label="Search weather"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
        </div>
        {error && (
          <div className="mb-5 p-3 bg-rose-950/50 border border-rose-800/50 rounded-xl flex items-center gap-2.5 text-rose-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {weather && !loading && (
          <div className="flex flex-col items-center text-center">
            <div className="my-1">
              {getWeatherIcon(weather.weather[0]?.main)}
            </div>
            <div className="my-1">
              <span className="text-5xl font-extrabold text-slate-100 tracking-tight">
                {Math.round(weather.main.temp)}°C
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-200 mt-1">
              {weather.name}{weather.sys?.country ? `, ${weather.sys.country}` : ''}
            </h2>
            <p className="text-xs font-medium text-slate-400 capitalize mb-6">
              {weather.weather[0]?.description}
            </p>
            <div className="grid grid-cols-2 gap-3.5 w-full">
              <div className="bg-slate-950/60 rounded-2xl p-3 flex items-center gap-3 border border-slate-800/80">
                <div className="p-2 bg-blue-500/15 text-blue-400 rounded-xl">
                  <Droplets className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-slate-400">Humidity</p>
                  <p className="text-sm font-bold text-slate-200">{weather.main.humidity}%</p>
                </div>
              </div>
              <div className="bg-slate-950/60 rounded-2xl p-3 flex items-center gap-3 border border-slate-800/80">
                <div className="p-2 bg-teal-500/15 text-teal-400 rounded-xl">
                  <Wind className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-slate-400">Wind</p>
                  <p className="text-sm font-bold text-slate-200">{weather.wind.speed} <span className="text-[10px] font-normal text-slate-400">km/h</span></p>
                </div>
              </div>
              <div className="bg-slate-950/60 rounded-2xl p-3 flex items-center gap-3 border border-slate-800/80">
                <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-slate-400">Feels Like</p>
                  <p className="text-sm font-bold text-slate-200">{Math.round(weather.main.feels_like)}°C</p>
                </div>
              </div>
              <div className="bg-slate-950/60 rounded-2xl p-3 flex items-center gap-3 border border-slate-800/80">
                <div className="p-2 bg-purple-500/15 text-purple-400 rounded-xl">
                  <Gauge className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-slate-400">Pressure</p>
                  <p className="text-sm font-bold text-slate-200">{weather.main.pressure} <span className="text-[10px] font-normal text-slate-400">hPa</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!weather && !loading && !error && (
          <div className="py-8 text-center flex flex-col items-center justify-center space-y-2">
            <Sun className="w-10 h-10 text-amber-400 mb-1" />
            <p className="text-sm font-semibold text-slate-200">No City Selected</p>
            <p className="text-xs text-slate-400 max-w-[200px]">
              Search a city above to see current weather conditions.
            </p>
          </div>
        )}
        {loading && (
          <div className="py-10 text-center flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
            <p className="text-xs font-medium text-slate-400">Fetching weather data...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Weather



