import React, { useEffect } from "react";
import { useRef } from "react";
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/dist/client/link';
import Script from 'next/script'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Myaccount = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [npassword, setNpassword] = useState('')
  const [bio, setBio] = useState('')



  // image uploading {very important code }
  // const { profile } = props;
  const fileUploader = useRef();
  const [dataBaseResponse, setDataBaseResponse] = React.useState({});
  const profileTrigger = (event) => {
    event.preventDefault();
    fileUploader.current.click();
  };
  const sendProfile = async (event) => {
    const formData = new FormData();
    formData.append("image", fileUploader.current.files[0]);
    formData.append("token", user.token)
    fetch('http://127.0.0.1:8000/updateimage/', {
      method: "POST",
      body: formData,
    }).then(async (response) => {
      await response.json().then((data) => {
        setDataBaseResponse({
          message: data.message,
          data,
        });
        toast.success("Successfully updated Profile pic", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    });
  };









  const router = useRouter()
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (!myuser) {
      router.push('/')
    }
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [router.query])

  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch('http://127.0.0.1:8000/getuser/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let res = await a.json()
    setName(res.name)

  }


  const handleUserSubmit = async (req, res) => {
    let data = { token: user.token, name, bio }
    let a = await fetch('http://127.0.0.1:8000/updateuser/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let Res = await a.json()
    toast.success("Successfully updated details", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }



  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == cpassword) {
      let data = { token: user.token, password, cpassword, npassword }
      let a = await fetch('http://127.0.0.1:8000/updatepassword/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      res = await a.json()
    }
    else {
      res = { success: false }
    }

    if (res.success) {
      toast.success("Successfully updated password", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.error("Error updating password", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setPassword('')
    setCpassword('')
    setNpassword('')
  }




  const handleChange = async (e) => {

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    } else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'npassword') {
      setNpassword(e.target.value)
    } else if (e.target.name == 'bio') {
      setBio(e.target.value)
    }
  }

  return (
    <><Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js" />
      <div className='container mb-20 mx-3 min-h-screen'>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
        <h1 className='text-3xl text-center font-bold'>Update your account</h1>

        {/* image uploading important code  */}
        <h2 className='font-semibold text-xl my-2'>Update Profile picture</h2>

        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload file</label>
        <input ref={fileUploader} onChange={sendProfile} name="profile-picture" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="js-file-uploader" type="file" accept="image/png, image/jpeg" />



        <h2 className='font-semibold text-xl my-2'>1. Change Details</h2>

        <div className='mx-auto flex my-4'>
          <div className='px-2 w-1/2'>
            <div className='mb-4'>
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className='mb-4'>
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be updated)</label>
              {user && user.token ? <input onChange={handleChange} value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
                : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
            </div>
          </div>
        </div>
        <div className='mx-auto flex my-4'>
          <div className='px-2 w-1/2'>
            <div className='mb-4'>
              <label htmlFor="bio" className="leading-7 text-sm text-gray-600">Bio</label>
              <input onChange={handleChange} value={bio} type="text" id="bio" name="bio" className="w-full bg-white rounded border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div></div>
        <button onClick={handleUserSubmit} className="text-white hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-900"> Submit</button>





        <h2 className='font-semibold text-xl my-2'>2. Change password</h2>
        <div className='mx-auto flex my-4'>
          <div className='px-2 w-1/2'>
            <div className='mb-4'>
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

            </div>
          </div>

          <div className='px-2 w-1/2'>
            <div className='mb-4'>
              <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
              <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

            </div>
          </div>

          <div className='px-2 w-1/2'>
            <div className='mb-4'>
              <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600"> Confirm Password</label>
              <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

        </div>



        <button onClick={handlePasswordSubmit} className="text-white hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-900"> Submit</button>

      </div></>
  )


}
export default Myaccount