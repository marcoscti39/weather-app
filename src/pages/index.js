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
          <Link href="/London">
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

          <Link href='/newyork'>
            <div className={styles.imageWrapper}>
              <div className={styles.cityImage}>
                <Image 
                  src='/images/new-york.jpg'
                  alt='new york image'
                  layout='fill'
                  objectFit='cover'/>
              </div>

              <span className={styles.cityName}>new york</span>
            </div>
          </Link>
         
          <Link href="/tokyo">
            <div className={styles.imageWrapper} >
              <div className={styles.cityImage}>
                <Image 
                  src='/images/tokyo.jpeg'
                  alt='tokyo image'
                  layout='fill'
                  objectFit='cover'/>
              </div>

              <span className={styles.cityName}>tokyo</span>
            </div>
          </Link>
          
          <Link href="/paris">
            <div className={styles.imageWrapper} >
              <div className={styles.cityImage}>
                <Image 
                  src='/images/paris.jpg'
                  alt='paris image'
                  layout='fill'
                  objectFit='cover'/>
              </div>

              <span className={styles.cityName}>paris</span>
            </div>
          </Link>
          
          

        </div>
    </main>
     
    </>
  )
}
