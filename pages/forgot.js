import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cpassword, setCpassword] = useState()
  const [hideemail, setHideemail] = useState(false)
  const [hidecode, setHidecode] = useState(true)
  const [hidepassword, setHidepassword] = useState(true)
  const [code, setCode] = useState()
  const [scode, setScode] = useState()
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('myuser')) {
      router.push('/')
    }
  }, [])


  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    } else if (e.target.name == 'password') {
      setPassword(e.target.value)
    } else if (e.target.name == 'code') {
      setCode(e.target.value)
    } else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
  }

  const handlecode = async (e) => {
    e.preventDefault()
    const data = { email }
    let res = await fetch('http://127.0.0.1:8000/forgot_sendcode/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let responce = await res.json()
    if (responce.success) {
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
    } else {
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
  const verifycode = async (e) => {
    if (code == scode) {
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
      setHidepassword(false)
    } else {
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
  const changepassword = async (e) => {
    e.preventDefault()
    if (password == cpassword) {
      const data = { email: email, password: password }
      let res = await fetch('http://127.0.0.1:8000/forgot_change/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      let responce = await res.json()
      setEmail('')
      setEmail('')
      setPassword('')
      toast.success('Your Password has been updated', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error('Password must be same', {
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

  return (
    <div>
     
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
            <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Forgot password</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/login'}><a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">Login </a></Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div hidden={hideemail}>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-800 focus:border-blue-800 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
              <div hidden={hideemail}>
                <button type="submit" onClick={handlecode} className="group my-4 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-cyan-500 group-hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Send Code
                </button></div>


              <div hidden={hidecode}>
                <label htmlFor="code" className="sr-only">Enter Code</label>
                <input value={code} onChange={handleChange} id="code" name="code" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" placeholder="Enter code" />
              </div>
              <div hidden={hidecode}>
                <button hidden={hidecode} onClick={verifycode} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-cyan-500 group-hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Verify Code
                </button></div>



              <div hidden={hidepassword}>
                <label htmlFor="password" className="sr-only">Enter Password</label>
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" placeholder="Enter New Password" />
              </div>

              <div hidden={hidepassword}>
                <label htmlFor="cpassword" className="sr-only">Confirm Password</label>
                <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
              </div>
            </div>


            <div hidden={hidepassword}>
              <button type="submit" onClick={changepassword} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
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