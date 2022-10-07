import React from 'react'
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramIcon,TelegramShareButton
} from 'next-share';


import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/dist/client/link';
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Myaccount = () => {
    const [name, setName] = useState('')
    const [profilepic, setPic] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [user, setUser] = useState(null)
    const [key, setKey] = useState(0)

    const [showfollowers, setShowfollowers] = useState(false)
    const [showfollowing, setShowfollowing] = useState(false)

    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])


    const [myposts, setMyposts] = useState([])



    const router = useRouter()
    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))
        if (!myuser) {
            router.push('/login')
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

        // let posts = JSON.parse(JSON.stringify(res.posts))
        // console.log(posts)
        setFollowers(res.followers)
        setFollowing(res.following)
        setName(res.name)
        setPic(res.profilepic)
        setBio(res.bio)
        setMyposts(JSON.parse(JSON.stringify(res.posts)))

    }



    const logout = () => {
        localStorage.removeItem('myuser')
        setUser({ value: null })
        setKey(Math.random)
        router.push("/")
    }

    const [hide, setHide] = useState(true)


    const like = async (e) => {
        let data = { token: myuser.token, slug: e }
        let a = await fetch('http://127.0.0.1:8000/like/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let res = await a.json()
        router.push(`${process.env.NEXT_PUBLIC_HOST}/post/${e}`)
    }

    return (<>
<div className='mb-20'>
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


        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 pt-10 sm:pt-24 pb-24 flex-col items-center">

                <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-100 dark:border-gray-100">
                    <div className="flex justify-end px-4 pt-4 relative">

                        <div className="p-10">
                            <button onClick={() => { setHide(!hide) }} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-100 rounded-lg text-sm p-1.5 absolute r-5" type="button">
                                <span className="sr-only">Open dropdown</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                            </button>
                        </div>
                        <div hidden={hide} className=" z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-100 absolute top-24">
                            <ul className="py-1" aria-labelledby="dropdownButton">
                                <li>
                                    <Link href="/settings"><a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">Edit</a></Link>
                                </li>
                                {/* <li>
                                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">Options</a>
                                </li> */}
                                <li>
                                    <a onClick={logout} href="#" className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100">Logout</a>
                                </li>
                            </ul>
                        </div>


                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={`/media/${profilepic}`} alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 ">{name}</h5>
                        <span className="text-sm text-gray-900 dark:text-gray-900">{bio}</span>
                        <div className="flex mt-4 space-x-3 md:mt-6">
                            <button onClick={() => setShowfollowers(true)} className="block text-white hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-900" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Followers
                            </button>

                            <button onClick={() => setShowfollowing(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-900" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Following
                            </button>





                            {/* <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Followers</a> */}
                            {/* <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-100 dark:hover:border-gray-700 dark:focus:ring-gray-700">Following</a> */}
                        </div>
                    </div>
                </div><div className=" px-0 py-2 ">
                <div className="w-full">
                    <div class="text-center mt-8 mx-auto">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">My posts</h1>
                        <div class="flex mt-2 justify-center">
                            <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                        </div>
                    </div>
                    {myposts.map((item) => {
                        return <div key={item._id} className="xl:w-3/5 md:w-3/4 w-full lg:h-1/2 py-4 lg:pl-10 mx-auto">

                            <div className="flex items-center space-x-4 px-2 relative">
                                <Link href={`/user/${item.user.email}`}>
                                    <div className="flex-shrink-0 cursor-pointer">
                                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                            <img className="w-12 h-12 rounded-full" src={item.user.image.slice(6,)} alt="Neil image" />
                                        </span>
                                    </div>
                                </Link>
                                <Link href={`/user/${item.user.email}`}>
                                    <div className="flex-1 min-w-0 cursor-pointer">
                                        <p className="text-sm font-medium text-black truncate ">
                                            {item.user.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-900">
                                            {item.user.bio.slice(0, 35)}
                                        </p>
                                        <p className="text-sm text-blue-500 truncate dark:text-blue-400 py-0">
                                            {Date(item.timestamp.slice(0, 10)).toLocaleString('en-us', { month: 'short', year: 'numeric' }).slice(0, 16)}
                                        </p>
                                    </div></Link>


                                <div className="inline-flex items-center text-base font-semibold text-black ">
                                    {item.category == "Work" && <svg className="w-6 h-6" fill="none" stroke="#263238" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}

                                    {item.category == "Idea" && <svg className="w-6 h-6" fill="#de6a04" stroke="#de6a04" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>}
                                    {item.category == "Work" && <Link passHref={true} href={`/pitch/${item.slug}`}><button type="button" className="mt-2 text-gray-900  bg-gray-200  font-medium rounded-lg text-sm px-1 py-0.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50  mb-2 -mr-3">
                                        Pitch
                                    </button></Link>}

                                </div>
                            </div>
                            <Link passHref={true} key={item._id} href={`/post/${item.slug}`}>
                                <div className='px-3 text-sm py-1 cursor-pointer'>
                                <p className="text-sm text-gray-500 dark:text-gray-900">{item.content.slice(0,100)} <span className='font-medium text-blue-800'>...Read more</span></p>
                                </div></Link>
                            <Link passHref={true} key={item._id} href={`/post/${item.slug}`}>
                                <div className="bg-gray-100 rounded-lg md:h-3/4 lg:h-1/2 cursor-pointer ">
                                    {item.image && <img className="h-full rounded w-full object-cover object-center mb-6" src={item.image.slice(6,)} alt="content" />}

                                </div></Link>

                            {/* like comment share buttons */}
                            <div className='flex items-center space-x-4 py-0 px-2 lg:w-1/3 md:w-1/2'>

                                <a onClick={() => like(item.slug)} href="#" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className='inline-block' width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    <span className='mx-2'>({item.likes.length})</span></a>

                                <Link passHref={true} key={item._id} href={`/post/${item.slug}`}><a href="#" className="flex w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className='inline-block mt-2' width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                    <span className='mx-2'>Comment</span></a></Link>

                                <div className='flex'><FacebookShareButton
                                    url={`${process.env.NEXT_PUBLIC_HOST}/post/${item.slug}`} >
                                    <FacebookIcon size={25} round />
                                </FacebookShareButton>
                                    <TelegramShareButton
                                        url={`${process.env.NEXT_PUBLIC_HOST}/post/${item.slug}`} >
                                        <TelegramIcon size={25} round />
                                    </TelegramShareButton>
                                    <RedditShareButton
                                        url={`${process.env.NEXT_PUBLIC_HOST}/post/${item.slug}`} >
                                        <RedditIcon size={25} round />
                                    </RedditShareButton>
                                    <WhatsappShareButton
                                        url={`${process.env.NEXT_PUBLIC_HOST}/post/${item.slug}`} >
                                        <WhatsappIcon size={25} round />
                                    </WhatsappShareButton>
                                    <LinkedinShareButton
                                        url={`${process.env.NEXT_PUBLIC_HOST}/post/${item.slug}`} >
                                        <LinkedinIcon size={25} round />
                                    </LinkedinShareButton>
                                </div>
                            </div>
                        </div>
                        {/* </Link> */ }
                    })}


                </div>
            </div>


            </div>
        </section>

        




        {/* followers modal */}
        {showfollowers ? (<>
            <div id="popup-modal" tabindex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-gray-100 rounded-lg shadow ">
                        <button onClick={() => setShowfollowers(false)} type="button" className="absolute top-3 right-2.5 text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div className="p-4 w-full max-w-md bg-gray-100 rounded-lg border shadow-md sm:p-8 ">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 ">Followers {followers.length}</h5>
                            </div>
                            <div className="flow-root overflow-y-scroll">
                                <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-300">
                                    {followers.map((item) => {
                                        return <Link passHref={true} key={item._id} href={`/user/${item.email}`}>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={item.profile_image.slice(6,)} alt="Neil image" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate ">
                                                            {item.email}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                        Profile
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>) : null}

        {/* following modal */}
        {showfollowing ? (<>
            <div id="popup-modal" tabindex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-100">
                        <button onClick={() => setShowfollowing(false)} type="button" className="absolute top-3 right-2.5 text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-100 dark:border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 ">Following {following.length}</h5>
                            </div>
                            <div className="flow-root overflow-y-scroll">
                                <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-300">
                                    {following.map((item) => {
                                        return <Link passHref={true} key={item._id} href={`/user/${item.email}`}>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={item.profile_image.slice(6,)} alt="Neil image" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate ">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate ">
                                                            {item.email}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                                        Profile
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>

                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>) : null}
        </div>


    </>
    )


}

export default Myaccount