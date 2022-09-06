import Link from 'next/link'
import React, {useEffect, useState, useRef} from 'react'
import uuid from 'react-uuid';

import styles from '../../styles/ShowSuggestionsOfCities.module.css'

export default function ShowSuggestionsOfCities({input, setInput}) {
    const [suggestions, setSuggestions] = useState([])
    const showSuggestions = useRef()

    const test = () => {
      console.log('oi')
      setInput("")
    }

    const fetchSuggestions = async (cityName) =>{
      const response = await fetch(cityName)
      const data = await response.json()
      setSuggestions(data)
    }

    const getLatAndLonUrl = (input) => {
        return `https://api.openweathermap.org/geo/1.0/direct?q=
        ${input}&limit=5&appid=${process.env.API_KEY}`
    }

    useEffect(() =>{
      if(input.length > 0){
  
        showSuggestions.current.style.display = 'flex'
        fetchSuggestions(getLatAndLonUrl(input))
        return 
      }
      showSuggestions.current.style.display = 'none'
  
    },[input])
  return (
    <>
      <div ref={showSuggestions} className={styles.suggestionBoard}>
        {suggestions?.map(({name,lat,lon, country}) => {
          return(

            <Link key={uuid()} href={`/${name}+${lat}+${lon}`}>
              <a className={styles.suggestion} onClick={test}>
              {`${name} (${country})`}
              </a>
            </Link>
          )
        } )}
      </div>
        
    </>
  )
}
