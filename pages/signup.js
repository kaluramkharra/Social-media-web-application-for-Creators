import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [hideemail, setHideemail] = useState(false)
  const [hidecode, setHidecode] = useState(true)
  const [hidedetail, setHidedetail] = useState(true)
  const [code,setCode] = useState()
  const [scode,setScode] = useState()
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('myuser')){
      router.push('/')
    }
  }, [])


  const handleChange = (e)=>{
    if(e.target.name=='name'){
      setName(e.target.value)
    }
    else if(e.target.name=='email'){
      setEmail(e.target.value)
    }else if(e.target.name=='password'){
      setPassword(e.target.value)
    }else if(e.target.name=='code'){
      setCode(e.target.value)
    }
  }

  const handlecode = async (e)=>{
    e.preventDefault()
    const data = {email}
    let res = await fetch(`http://127.0.0.1:8000/sendcode/`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data),
    })
    let responce = await res.json()
    if(responce.success){
      toast.success('Code send successfully', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setScode(responce.code);
        setHideemail(true);
        setHidecode(false)
    }else{
      toast.error(responce.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  const verifycode = async (e)=>{
    if(code==scode){
      toast.success('Code verified successfully', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setHidecode(true);
        setHidedetail(false)
    }else{
      toast.error('Please enter the valid code', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
//${process.env.NEXT_PUBLIC_HOST}/api
  const handleSignup = async (e)=>{
    e.preventDefault()
    const data = { name: name, email: email, password: password}
    let res = await fetch('http://127.0.0.1:8000/signup/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data),
    })
    let responce = await res.json()
    setEmail('')
    setEmail('')
    setPassword('')
    toast.success('Your account has been created!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      router.push('/')
  }

  return (
    <div>
      <Script src="../path/to/flowbite/dist/flowbite.js"/>
       <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign up for an account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
          <Link href={'/login'}><a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">Login </a></Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true"/>
        <div className="rounded-md shadow-sm -space-y-px">
        <div hidden={hideemail}>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-800 focus:border-blue-800 focus:z-10 sm:text-sm" placeholder="Email address"/>
          </div>
        <div hidden={hideemail}>
          <button type="submit" onClick={handlecode} className="group relative w-full my-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-cyan-500 group-hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            Send Code
          </button></div>


          <div hidden={hidecode}>
            <label htmlFor="code" className="sr-only">Enter Code</label>
            <input value={code} onChange={handleChange} id="code" name="code" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-800 focus:border-blue-800 focus:z-10 sm:text-sm" placeholder="Enter code"/>
          </div>
          <div hidden={hidecode}>
          <button hidden={hidecode} onClick={verifycode} className="group relative my-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-cyan-500 group-hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            Verify Code
          </button></div>



        <div hidden={hidedetail}>
            <label htmlFor="name" className="sr-only">Name</label>
            <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-800 focus:border-blue-800 focus:z-10 sm:text-sm" placeholder="Enter your name"/>
          </div>
         
          <div hidden={hidedetail}>
            <label htmlFor="password" className="sr-only">Password</label>
            <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-800 focus:border-blue-800 focus:z-10 sm:text-sm" placeholder="Password"/>
          </div>
        </div>
  
        
        <div hidden={hidedetail}>
          <button onClick={handleSignup} type="submit" className="group relative my-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-cyan-500 group-hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            Sign up
          </button>
        </div>
      </form>

     

    </div>
  </div></div>
  )
}

export default Signup