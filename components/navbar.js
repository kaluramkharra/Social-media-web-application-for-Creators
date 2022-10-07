import React from 'react'
import { useState } from 'react';
import Link from 'next/link'
import { useEffect } from 'react'
import { AiFillSetting,AiFillHome,AiOutlinePlusCircle } from 'react-icons/ai';
import {MdWork,MdCategory,MdNotificationsActive,MdOutlineAccountCircle} from 'react-icons/md'
import { useRouter } from 'next/router'
import {FcAbout} from 'react-icons/fc'
import {FaUser} from 'react-icons/fa'
import {TbLogout} from 'react-icons/tb'
import {FiAlertCircle} from 'react-icons/fi'
import {BiCategoryAlt} from 'react-icons/bi'
import '../node_modules/font-awesome/css/font-awesome.min.css';
const Footer = () => {
  const [hidenav, setHidenav] = useState(true)
  const [hideprofile, setHideprofile] = useState(true)
  const [hidenotifications, setHidenotifications] = useState(true)
  const [hidesearch, setHidesearch] = useState(true)
  const [notifications, setNotifications] = useState({})
  const router = useRouter()
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
      fetchData(myuser.token)
    }
    setKey(Math.random())
  }, [router.query])

  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch('http://127.0.0.1:8000/notifications/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let res = await a.json()
    setNotifications(res.notifications)

  }
  const logout = () => {
    localStorage.removeItem('myuser')
    setUser({ value: null })
    setKey(Math.random)
    router.push("/")
}


  const [query,setQuery] = useState('web');

  const handlechange = (e)=>{
    if(e.target.name=='query'){
      setQuery(e.target.value)
    }
  }

  return (<>
    {!(user.value == null) &&
      <div>
        <nav className="bg-gray-100">
          <div className=" max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center ">
                <button onClick={() => setHidenav(!hidenav)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-100" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>

                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg> */}
                  <div hidden={!hidenav}>
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </div>
                  <div hidden={hidenav}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="block h-10 w-auto  lg:hidden" src="/logo.png" alt="lets create idea" />
                  <img className="hidden mx-5 h-8 w-auto lg:block" src="/logo.png" alt="lets create idea" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link href={'/'}><a href="#" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</a></Link>
                    <Link href={'/categories'}><a href="#" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Categories</a></Link>
                    <Link href={'/addpost'}><a href="#" className=" flex text-gray-900 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">New Post</a></Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* desktop notifications options */}
                <div className="hidden sm:block relative ml-3">
                  <div>
                    <button onClick={() => setHidenotifications(!hidenotifications)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-100" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">View notifications</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                    </button>
                  </div>
                  <div hidden={hidenotifications} className="absolute right-0 z-10 mt-2 w-64 origin-bottom-right  rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <div class="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-100 dark:border-gray-100">
                      <div class="flex justify-between items-center mb-4">
                        <h5 class="text-sm font-bold leading-none text-gray-900">Notifications</h5>
                      </div>
                      <div class="flow-root h-80 overflow-y-scroll">
                        <ul role="list" class="divide-y divide-gray-400 dark:divide-gray-700">
                          {Object.keys(notifications).map((item) => {
                            return <Link key={item._id} href={notifications[item].url}><li class="py-3 sm:py-4">
                              <div class="flex items-center space-x-4">

                                <div class="flex-1 min-w-0">
                                  <p class="text-sm font-medium text-gray-900 truncate ">
                                    {notifications[item].content}
                                  </p>
                                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                  {Date(notifications[item].timestamp.slice(0, 10)).toLocaleString('en-us', { month: 'short', year: 'numeric' }).slice(0, 16)}
                                  </p>
                                </div>
                              </div>
                            </li></Link>
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* search */}
                <div className="relative ml-3">
                  <div>
                    <button onClick={() => setHidesearch(!hidesearch)} type="button" className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-100" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">View notifications</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>

                    </button>
                  </div>
                  <div hidden={hidesearch} className="absolute right-0 z-10 mt-2 w-80 md:w-96 origin-bottom-right  rounded-lg bg-white  shadow-lg ring-1 " role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <form>
                      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                      <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input onChange={handlechange} type="search" value={query} name="query" id="query" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Mockups, Logos..." required />
                        <Link href={`/search/${query}`}><button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Search</button></Link>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* side navigation bar for desktop and phone */}
          <div hidden={hidenav} className="absolute top-14 z-30" id="mobile-menu">

            {/* <aside className="w-64" aria-label="Sidebar"> */}
            <div className="overflow-y-auto py-4 px-3 bg-gray-100 rounded md:w-2/5 w-2/3 lg:w-1/5 h-screen">
              <ul className="space-y-2">
                
              <li>
              <Link href={'/'}><a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 d">
                  <AiFillHome/><span className="flex-1 ml-3 whitespace-nowrap">Home</span>
                  </a></Link>
                </li>
                <li>
                <Link href={'/categories'}><a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 d">
                  <MdCategory/><span className="flex-1 ml-3 whitespace-nowrap">Categories</span>
                  </a></Link>
                </li>
                
                <li>
                  <Link href={'/mypitches'}><a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                    <MdWork/><span className="flex-1 ml-3 whitespace-nowrap">My work</span>
                    <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full ">New</span>
                  </a></Link>
                </li>
                <li>
                <Link href={'/about'}><a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                  <FcAbout className='text-gray-800'/><span className="flex-1 ml-3 whitespace-nowrap">About Us</span>
                  </a></Link>
                </li>
                <li className='divide-gray-300'>
                <Link href={'/myprofile'}><a href="#" className="divide-y flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
                   <FaUser/><span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                  </a></Link>
                </li>
                <li>
                <Link href={'/settings'}><a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                    <AiFillSetting/>
                    <span className="flex-1 ml-3 whitespace-nowrap"> Settings</span>
                  </a></Link>
                </li>
                <li>
                <a href="#" onClick={logout} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                  <TbLogout/><span className="flex-1 ml-3 text-red-600 whitespace-nowrap">Log out</span>
                  </a>
                </li>
              </ul>
              <div id="dropdown-cta" className="p-4 mt-6 bg-blue-900 rounded-lg dark:bg-blue-900" role="alert">
                <div className="flex items-center mb-3">
                
                  <span className="bg-orange-100 flex text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900 my-auto"><FiAlertCircle className='my-auto mr-1'/>Important</span>
                  
                </div>
                <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
                  We are very glad that you are here.We have launched a new work system in which you can upload your work and find the best skilled guy.And if you are looking for work then you can pitch anyone according to your skillset.
                </p>
                {/* <a className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" href="#">Turn new navigation off</a> */}
              </div>
            </div>
            {/* </aside> */}

          </div>
        </nav>


        {/* bottom navigation for phone */}
        <div className="">

          <section id="bottom-navigation" className="sm:hidden bg-gray-100 block fixed inset-x-0 bottom-0 z-10 shadow ">
            <div id="tabs" className="flex justify-between">
              <Link href={'/'}><a  className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 ">
                <AiFillHome  size={30} className='mx-auto inline-block mb-1 text-gray-800'/>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto inline-block mb-1' width="32" height="32" viewBox="0 0 30 30" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> */}
              </a></Link>
              <Link href={'/categories'}><a  className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 ">
              <BiCategoryAlt  size={30} className='mx-auto inline-block mb-1 text-gray-800'/>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto bi bi-compass' width="45" height="45" fill="currentColor" viewBox="0 0 30 30"> <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" /> <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" /> </svg> */}
                </a></Link>
              <Link href={'/addpost'}><a className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 ">
              <AiOutlinePlusCircle  size={30} className='mx-auto inline-block mb-1 text-gray-800'/>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' width="32" height="32" viewBox="0 0 30 30" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> */}
              </a></Link>
              <a href="#" onClick={() => setHidenotifications(!hidenotifications)} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 ">
              <MdNotificationsActive  size={30} className='mx-auto inline-block mb-1 text-gray-800'/>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' width="32" height="32" viewBox="0 0 30 30" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg> */}
              </a>
              <Link href={'/myprofile'}><a href="#" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 ">
              <MdOutlineAccountCircle  size={30} className='mx-auto inline-block mb-1 text-gray-800'/>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' width="32" height="32" viewBox="0 0 30 30" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg> */}
                <span className="tab tab-account block text-xs"></span>
              </a></Link>
            </div>

            <div hidden={hidenotifications} aria-labelledby="slide-over-title" className="absolute fixed sm:hidden right-4 bottom-16 z-10 w-64origin-bottom-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" tabindex="-1">
              <div class="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-100">
                <div class="flex justify-between items-center mb-4">
                  <h5 class="text-sm font-bold leading-none text-gray-900">Notifications</h5>
                </div>
                <div class="flow-root h-72 overflow-y-scroll">
                  <ul role="list" class="divide-y divide-gray-400 ">
                    {Object.keys(notifications).map((item) => {
                      return <Link key={item._id} href={notifications[item].url}><li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">

                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate ">
                              {notifications[item].content}
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {Date(notifications[item].timestamp.slice(0, 10)).toLocaleString('en-us', { month: 'short', year: 'numeric' }).slice(0, 16)}
                            </p>
                          </div>
                        </div>
                      </li></Link>
                    })}

                  </ul>
                </div>
              </div>
            </div>

          </section>

        </div>
      </div>
    }</>
  )
}

export default Footer