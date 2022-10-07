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
const Userpost = ({ pitch }) => {
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

        }
    }, [router.query])


    return (<>
    <div className='mb-20'>
        <Link href={`/post/${pitch.post.slug}`}>
            <article className="cursor-pointer flex md:w-3/4 lg:w-2/3 bg-gray-200 items-start space-x-6 p-6 md:mx-auto m-2 rounded-md">
                {pitch.post.image && <img src={pitch.post.image.slice(6,)} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />}
                <div className="min-w-0 relative flex-auto">

                    <div>
                        <dd className="flex items-center">
                            <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                <circle cx="1" cy="1" r="1" />
                            </svg>
                            {pitch.post.content}
                        </dd>
                    </div>
                </div>
            </article>
        </Link>

        <figure class="md:flex bg-slate-100 md:w-3/4 lg:w-2/3 m-2 rounded-md p-8 md:p-0 md:mx-auto">
            {pitch.pitcheruser.profile_image && <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={pitch.pitcheruser.profile_image.slice(6,)} alt="" width="384" height="512" />}
            <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                    <p class="text-lg font-medium">
                        {pitch.content}
                    </p>
                </blockquote>
                <figcaption class="font-medium">
                    <Link href={`/user/${pitch.pitcheruser.email}`}>
                        <div class="text-sky-500 dark:text-sky-400">
                            {pitch.pitcheruser.name}
                        </div></Link>
                    <Link href={`/user/${pitch.pitcheruser.email}`}>
                        <div class="text-slate-700 dark:text-slate-500">
                            {pitch.pitcheruser.email}
                        </div></Link>
                </figcaption>
            </div>
        </figure>
        </div>
    </>

    )
}


export async function getServerSideProps(context) {

    const data = { slug: context.query.slug }
    let res = await fetch('http://127.0.0.1:8000/singlepitch/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    const json_res = await res.json()
    let pitch = JSON.parse(JSON.stringify(json_res.pitch))
    return {
        props: { pitch: JSON.parse(JSON.stringify(pitch)) }
    }
}
export default Userpost