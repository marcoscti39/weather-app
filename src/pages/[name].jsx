import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'

import styles from '../../styles/CityWeather.module.css'
import ShowSuggestionsOfCities from '../components/showSuggestionsOfCities'
import WeatherCarousel from '../components/weatherCarousel'
import WeeklyWeather from "../components/weeklyWeather"
import { formatDate } from '../formatDate'

export async function getServerSideProps(context) {
  const splitParams = context.params.name.split("+")
  const [cityName,lat,lon] = splitParams
  const cityWeatherByHoursUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric` 
  const cityWeatherCurrentUrL = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`

  const fetchWeatherByHour = async (lat,lon) =>{
    const response = await fetch(cityWeatherByHoursUrl(lat,lon))
    return await response.json()
  }

  const fetchCurrentWeather = async (lat,lon) =>{
    const response = await fetch(cityWeatherCurrentUrL(lat,lon))
    return await response.json()
  }
  async function fetchCityWeather(lat, lon){
    return await Promise.all([fetchCurrentWeather(lat,lon), fetchWeatherByHour(lat,lon)])
  }
  
  return {
    props: {
      data: await fetchCityWeather(lat,lon),
      cityName
    }
  }
}


export default function CityWeather({data, cityName}) {
  const [input, setInput] = React.useState("")

  const [cityWeather] = data
  const cityCountry = `${cityName} (${cityWeather?.sys?.country})`

  
  const {temp_max:maxTempeture} = cityWeather?.main || 0
  const {temp_max:minTempeture} = cityWeather?.main || 0


  const {sunrise} = cityWeather?.sys || 0
  const {sunset} = cityWeather?.sys || 0

  const {time:formatedSunrise} = formatDate(sunrise)
  const {time:formatedSunset} = formatDate(sunset)
  
  const [{description, icon}] = cityWeather?.weather || [0]

  return (
    <>
      <Head>
        <title>Weather Forecast</title>
      </Head>

      <main className={styles.weatherContainer}>
        <Link href='/'><a className={styles.backHome}>Home</a></Link>
        <form className={styles.form}>
          <input type='text' className={styles.input} 
            value={input} onInput={(e) => setInput(e.target.value)}
            placeholder='Search for another city...'/>

          <ShowSuggestionsOfCities input={input} setInput={setInput}/>

        </form>

        <section className={styles.currentWeatherSection}>
          <div className={styles.currentWeatherContainer}>

            <h1 className={styles.title}>{cityCountry}</h1>
            <strong className={styles.maxTempeture}>{Math.floor(maxTempeture)}ºC</strong>
            <strong className={styles.minTempeture}>{Math.floor(minTempeture)}ºC</strong>

            <div className={styles.sunSetAndRiseContainer}>

              <div className={styles.sunriseContainer}>
                <strong className={styles.sunriseTitle}>Sunrise</strong>
                <strong className={styles.sunriseTime}>{formatedSunrise}</strong>

              </div>

              <div className={styles.sunsetContainer}>
                <strong className={styles.sunsetTitle}>Sunset</strong>
                <strong className={styles.sunsetTime}>{formatedSunset}</strong>
              </div>

            </div>

          </div>

          <div className={styles.weatherState}>
            <div className={styles.weatherStateImg}>
              <Image 
                alt='weather state'
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                width={130}
                height={120}/>

            </div>

            <span className={styles.weatherStateText}>{description}</span>

          </div>

          
        </section>

        <WeatherCarousel data={data}/>

        <WeeklyWeather data={data}/>

      </main>
    </>
  )
}
