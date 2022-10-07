import React from 'react'
import Link from 'next/dist/client/link';

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';

const Mypitches = () => {
    const [name, setName] = useState('')
    const [profilepic, setPic] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [user, setUser] = useState(null)
    const [key, setKey] = useState(0)


    const [my_pitches, setMypitches] = useState({})



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
        let a = await fetch('http://127.0.0.1:8000/mypitches/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let res = await a.json()
        setMypitches(res.mypitches)

    }


    return (
        <div className='mb-20'> 
            {Object.keys(my_pitches).map((item) => {
            return <Link key={item._id} href={`/mypitches/${my_pitches[item].slug}`}>
             <article  className="cursor-pointer flex md:w-3/4 lg:w-2/3 bg-gray-200 items-start space-x-6 p-6 md:mx-auto m-2 rounded-md">
            {my_pitches[item].post.image && <img src={my_pitches[item].post.image.slice(6,)} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
                }<div className="min-w-0 relative flex-auto">
                    <h2 className="font-semibold text-slate-900 truncate pr-20">{my_pitches[item].pitcheruser.name}</h2>
                    <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                        <div>
                            <dt className="sr-only">Rating</dt>
                            <dd className="px-1.5 ring-1 ring-slate-200 rounded">{my_pitches[item].pitcheruser.email}</dd>
                        </div>
                        <div className="ml-2">
                            <dt className="sr-only">Year</dt>
                            {Date(my_pitches[item].timestamp.slice(0,10)).toLocaleString('en-us',{month:'short', year:'numeric'}).slice(0,16)}
                        </div>
                        
                        <div className="flex-none w-full mt-2 font-normal">
                            <dt className="sr-only">Cast</dt>
                            <dd className="text-slate-400">More details</dd>
                        </div>
                    </dl>
                </div>
            </article></Link>
        })}

            
        </div>
    )
}

export default Mypitches