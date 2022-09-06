import React,{useState} from 'react'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ShowSuggestionsOfCities from '../components/showSuggestionsOfCities';



export default function Home() {
  const [input, setInput] = useState("")
  
  return (
    <>
    <main className={styles.main}>
      <form className={styles.form}>
          <input className={styles.input} type='text' placeholder='Search a city name...'
                value={input} onInput={(e) => setInput(e.target.value)}/>
          <ShowSuggestionsOfCities input={input} setInput={setInput}/>
      </form>

        <div className={styles.imagesContainer}>
          <Link href="London+51.5073219+-0.1276474">
            <div className={styles.imageWrapper} >
              <div className={styles.cityImage}>
                <Image 
                  src='/images/london.png'
                  alt='london image'
                  layout='fill'
                  objectFit='cover'
                  priority="true"
                  placeholder='blur'
                  blurDataURL/>
              </div>

              <span className={styles.cityName}>london</span>
            </div>
          </Link>

          <Link href='/New%20York+40.7127281+-74.0060152'>
            <div className={styles.imageWrapper}>
              <div className={styles.cityImage}>
                <Image 
                  src='/images/new-york.jpg'
                  alt='new york image'
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL/>
              </div>

              <span className={styles.cityName}>new york</span>
            </div>
          </Link>
         
          <Link href="/Tokyo+35.6828387+139.7594549">
            <div className={styles.imageWrapper} >
              <div className={styles.cityImage}>
                <Image 
                  src='/images/tokyo.jpeg'
                  alt='tokyo image'
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL/>
              </div>

              <span className={styles.cityName}>tokyo</span>
            </div>
          </Link>
          
          <Link href="/Paris+48.8588897+2.3200410217200766">
            <div className={styles.imageWrapper} >
              <div className={styles.cityImage}>
                <Image 
                  src='/images/paris.jpg'
                  alt='paris image'
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL/>
              </div>

              <span className={styles.cityName}>paris</span>
            </div>
          </Link>
          
          

        </div>
    </main>
     
    </>
  )
}
