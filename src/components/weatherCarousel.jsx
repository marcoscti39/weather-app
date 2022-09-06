import React from 'react'
import Image from 'next/image'
import styles from '../../styles/WeatherCarousel.module.css'
import uuid from 'react-uuid';

import { formatDate } from '../formatDate'


export default function WeatherCarousel({data}) {

  const [,cityWeatherByHour] = data

  const todayForecast = cityWeatherByHour?.list?.filter(weather =>{
    if(formatDate(weather.dt).day === formatDate(Date.now(), true, false).day){
      return weather
    }
  })


  const nextHoursForecast = todayForecast?.filter((item,index) =>{
    if(todayForecast[0].dt > Math.floor(Date.now() / 1000) + 86400){
      return item
    }
    if(todayForecast[index + 1] === undefined){
      return item
    }
    if(todayForecast[index + 1]?.dt > Math.floor(Date.now() / 1000) + 86400){
      return item
    } 
  })


  return (
    <>
        <section className={styles.weatherNextHoursSection}>
            {nextHoursForecast?.map((weather,index) =>{
              const {main, dt, weather:[{icon}]} = weather
              return (
                <article key={uuid()} className={styles.weatherNextHourContainer}>
                  <h2 className={styles.nextHourTime}>{index === 0 ? 'Now' : formatDate(dt).time}</h2>
                  <Image 
                    alt='weather state'
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    width={115}
                    height={115}/>

                  <strong className={styles.nextHourTemperature}>{Math.floor(main.temp)}ºC</strong>
                </article>
              )
            })}
           

           
        </section>
    </>
  )
}
