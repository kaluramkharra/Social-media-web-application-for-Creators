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






import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Script from 'next/script'
import Link from 'next/link'
const Userpost = ({ post, comments }) => {
    const router = useRouter()
    const [myuser, setUser] = useState(null)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [profile_image, setProfile_image] = useState('')

    const [content, setContent] = useState('')


    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))
        if (!myuser) {
            router.push('/login')
        }
        if (myuser && myuser.token) {
            setUser(myuser)
            setEmail(myuser.email)
            setName(myuser.name)
            console.log(myuser)
            console.log(myuser.profile_image)
            setProfile_image(myuser.profile_image)

        }
    }, [router.query])


    const like = async () => {
        let data = { token: myuser.token, slug: post.slug }
        let a = await fetch('http://127.0.0.1:8000/like/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let res = await a.json()
        console.log(res)
        router.push(`${process.env.NEXT_PUBLIC_HOST}/post/${post.slug}`)
    }

    const handleChange = async (e) => {
        if (e.target.name == 'content') {
            setContent(e.target.value)
        } else if (e.target.name == 'reply') {
            setReply(e.target.value)
        }
    }

    const comment = async (e) => {
        e.preventDefault()
        if (content.length < 2) {
            toast.error('Please write something', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const data = { token: myuser.token, slug: post.slug, content: content }
            let res = await fetch('http://127.0.0.1:8000/comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            let responce = await res.json()
            console.log("RESPONSE")
            console.log(responce)
            setContent('')
            if (responce.success) {
                toast.success('Comment posted successfully', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            router.push(`${process.env.NEXT_PUBLIC_HOST}/post/${post.slug}`)
        }

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
            <div className=" px-0 py-2 mx-0">
                <div className="flex flex-wrap  w-full">

                    <div className="xl:w-3/5 md:w-3/4 mx-auto w-full lg:pl-10 py-4">
                        <div className="flex items-center space-x-4 px-2">
                            <div className="flex-shrink-0 cursor-pointer">
                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                    <img className="w-12 h-12 rounded-full" src={post.user.image.slice(6,)} alt="Neil image" />
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 cursor-pointer">
                                <p className="text-sm font-medium text-black truncate ">
                                    {post.user.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {post.user.bio.slice(0,30)}
                                </p>
                                <p className="text-sm text-blue-500 truncate dark:text-blue-400 py-0">
                                    {Date(post.timestamp.slice(0, 10)).toLocaleString('en-us', { month: 'short', year: 'numeric' }).slice(0, 16)}
                                </p>
                            </div>
                            {post.category == "Work" &&
                                <div className="inline-flex items-center text-base font-semibold text-black ">
                                    <svg class="w-6 h-6" fill="none" stroke="#263238" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                            }
                            {post.category == "Idea" &&
                                <div className="inline-flex items-center text-base font-semibold text-black ">
                                    <svg class="w-6 h-6" fill="#de6a04" stroke="#de6a04" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                </div>
                            }
                        </div>

                        <div className='px-3 text-sm py-1 cursor-pointer'>
                            <p>{post.content}</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg cursor-pointer">
                            {post.image && <img className="h-full rounded w-full object-cover object-center mb-6" src={post.image.slice(6,)} alt="content" />}
                        </div>


                        <div className='flex items-center space-x-4 py-0 px-2 lg:w-1/3 md:w-1/2'>

                            <a onClick={like} href="#" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className='inline-block' width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                <span className='mx-2'>Like ({post.likes.length})</span></a>

                            <a href="#" className="flex w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className='mt-2 inline-block' width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                <span className='mx-2'>Comment</span></a>

                            <div className='flex'><FacebookShareButton
                                url={`${process.env.NEXT_PUBLIC_HOST}/post/${post.slug}`} >
                                <FacebookIcon size={25} round />
                            </FacebookShareButton>
                                <TelegramShareButton
                                    url={`${process.env.NEXT_PUBLIC_HOST}/post/${post.slug}`} >
                                    <TelegramIcon size={25} round />
                                </TelegramShareButton>
                                <RedditShareButton
                                    url={`${process.env.NEXT_PUBLIC_HOST}/post/${post.slug}`} >
                                    <RedditIcon size={25} round />
                                </RedditShareButton>
                                <WhatsappShareButton
                                    url={`${process.env.NEXT_PUBLIC_HOST}/post/${post.slug}`} >
                                    <WhatsappIcon size={25} round />
                                </WhatsappShareButton>
                                <LinkedinShareButton
                                    url={`${process.env.NEXT_PUBLIC_HOST}/post/${post.slug}`} >
                                    <LinkedinIcon size={25} round />
                                </LinkedinShareButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>













        <div className="xl:w-3/5 md:w-3/4 mx-auto w-full flex my-5">
            <div className="flex-shrink-0 mr-3">
                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={profile_image.slice(6,)} alt="" />
            </div>

            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>{name}</strong> <span className="text-xs text-gray-400"></span>
                <textarea onChange={handleChange} value={content} id="content" name="content" rows="2" className=" border-none px-2 mt-1 block w-full sm:text-sm" placeholder="I have a new idea.."></textarea>

                <div className="mt-4 flex items-center">
                    <div onClick={comment} class="text-sm text-gray-500 font-semibold">
                        Post comment
                    </div>
                </div>
            </div>
        </div>

        <div className='xl:w-3/5 md:w-3/4 mx-auto w-full mb-20'>
            {Object.keys(comments).map((item) => {
                return <div key={comments[item]._id} className="flex flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">

                    <div className="space-y-4">
                        <div className="flex">
                            <Link href={`/user/${comments[item].user.email}`}>
                            <div className="flex-shrink-0 mr-3 cursor-pointer">
                                <img className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src={comments[item].user.image.slice(6,)} alt="" />
                            </div></Link>
                            <div className="flex-1 w-full bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                <strong>{comments[item].user.name}</strong> <span className="text-xs text-gray-400">{Date(comments[item].timestamp.slice(0, 10)).toLocaleString('en-us', { month: 'short', year: 'numeric' }).slice(0, 16)}</span>
                                <p className="text-xs sm:text-sm block">
                                    {comments[item].content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>

        </div>

    </>

    )
}


export async function getServerSideProps(context) {

    const data = { slug: context.query.slug }
    let res = await fetch('http://127.0.0.1:8000/post/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    const json_res = await res.json()
    let post = JSON.parse(JSON.stringify(json_res.post))
    let comments = JSON.parse(JSON.stringify(json_res.comments))
    return {
        props: { post: JSON.parse(JSON.stringify(post)), comments: comments }
    }
}
export default Userpost