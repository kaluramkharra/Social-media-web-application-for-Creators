import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import { useRouter } from 'next/router'
import Navbar from '../components/navbar'
import nookies from 'nookies'
import '../styles/globals.css'
import Script from 'next/script'
import LoadingBar from 'react-top-loading-bar'

import { FaBeer } from 'react-icons/fa';

function MyApp({ Component, pageProps,session }) {
  const router = useRouter()
  const [user,setUser] = useState({value:null})
  const [key,setKey] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    })

    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if(myuser){
      setUser({value:myuser.token,email:myuser.email})
    }
    setKey(Math.random())
  },[router.query])

  const logout = ()=>{
    localStorage.removeItem('myuser')
    setUser({value:null})
    setKey(Math.rendom)
    router.push("/")
  }

  return <>
  
  {/* <Script src="https://cdn.tailwindcss.com"/> */}

  <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
  <Navbar logout={logout} user={user} key={key}/>
  <Component {...pageProps} /> 
  <Footer/>
 
  </>
}

export default MyApp
