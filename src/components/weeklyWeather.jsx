import React from 'react'
import Image from 'next/image'
import styles from '../../styles/WeeklyWeather.module.css'
import uuid from 'react-uuid';

import { formatDate} from '../formatDate'

export default function WeeklyWeather({data}) {

    const [,cityWeatherByHour] = data

    const weeklyForecast = cityWeatherByHour?.list?.filter((forecast) =>{

        if(formatDate(forecast.dt).day !== formatDate(Date.now(), false, false).day){
            return forecast
        }
    })

    const filteredWeeklyForecast = weeklyForecast?.filter((forecast, index) =>{
        if(index === 0) return forecast
        if(formatDate(weeklyForecast[index - 1].dt).day !== formatDate(forecast.dt).day){
            return forecast
        }
    })

    
  return (
    <>
        <section className={styles.weeklyWeatherSection}>
            <h2 className={styles.weeklyTitle}>
                <span className={styles.boldTxt}>Weekly</span> Weather
            </h2>
            {filteredWeeklyForecast?.map((forecast) =>{
            const {dt, main, weather:[weather]} = forecast
            return (
                <div key={uuid()} >
                    <article className={styles.weeklyArticle}>
                        <div className={styles.dayWrapper}>
                            <h3 className={styles.dayTxt}>{formatDate(dt).day}</h3>
                            <strong className={styles.maxTemperature}>{Math.floor(main.temp_max)}ºC</strong>
                            <strong className={styles.minTemperature}>{Math.floor(main.temp_min)}ºC</strong>

                        </div>

                        <div className={styles.sunsetAndRiseWrapper}>
                            <div className={styles.sunriseContainer}>
                                <strong className={styles.sunriseTxt}>Sunrise</strong>
                                <strong className={styles.sunriseTime}>6:32 AM</strong>
                            </div>
                            <div className={styles.sunsetContainer}>
                                <strong className={styles.sunsetTxt}>Sunset</strong>
                                <strong className={styles.sunsetTime}>6:32 PM</strong>
                            </div>
                        </div>

                        <div className={styles.weatherStateContainer}>
                            <div className={styles.weatherStateImage}>
                                <Image 
                                    alt='weather state'
                                    src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                    layout='fill'
                                    objectFit='cover'/>
                            </div>
                            
                            <strong className={styles.weatherStateTxt}>{weather.description}</strong>
                        </div>
                        
                    </article>
                </div>

            )
        })}
            
        </section>
    </>
  )
}
