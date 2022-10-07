import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPost = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState(null)
    const [profile_image, setProfile_image] = useState('')
    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))

        if (!myuser) {
            router.push('/')
        }
        if (myuser && myuser.token) {
            setUser(myuser)
            setEmail(myuser.email)
            setProfile_image(myuser.profile_image)
            setName(myuser.name)

        }
    }, [router.query])

    // showing image on screen
    const [img, setImg] = useState('')
    const [showimg, setShowimg] = useState(false)
    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
        setShowimg(true)
    };

    // uploading image to database
    const fileUploader = useRef();
    const [dataBaseResponse, setDataBaseResponse] = React.useState({});
    const profileTrigger = (event) => {
        event.preventDefault();
        fileUploader.current.click();
    };



    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    const handleChange = async (e) => {

        if (e.target.name == 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name == 'content') {
            setContent(e.target.value)
        }
    }



    const handlepost = async (event) => {
        const formData = new FormData();
        if (content.length < 10 || category.length < 2) {
            toast.error("Please select a category or write something more in content", {
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

            formData.append("image", fileUploader.current.files[0]);
            formData.append("token", user.token)
            formData.append("category", category)
            formData.append("content", content)
            fetch('http://127.0.0.1:8000/newpost/', {
                method: "POST",
                body: formData,
            }).then(async (response) => {
                await response.json().then((data) => {
                    setDataBaseResponse({
                        message: data.message,
                        data,
                    });
                    toast.success("Posted successfully", {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setContent('')
                    setCategory('')
                    router.push('/addpost')
                });
            });
        };
    }


    return (
        <>
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

            <div className='container mb-20'>

                <div className="mt-5 md:col-span-2 md:mt-0">

                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                        <img className="w-12 h-12 rounded-full" src={profile_image.slice(6,)} alt="Neil image" />
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-black truncate ">
                                        {name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {email}                                    </p>
                                </div>
                                <div onClick={handlepost} className="inline-flex items-center text-base font-semibold text-black ">
                                    Post
                                </div>

                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Category : {category}</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <button onClick={() => { setCategory('Idea') }} type="button" className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>Idea
                                        </button>
                                        <button onClick={() => { setCategory('Work') }} type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            Work
                                        </button>
                                        {/* <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"></span>
                                        <input onChange={handleChange} type="text" value={title} name="title" id="title" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Choose Perfect Title" /> */}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label for="content" className="block text-sm font-medium text-gray-700">Content</label>
                                <div className="mt-1">
                                    <textarea onChange={handleChange} value={content} id="content" name="content" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="I have a new idea.."></textarea>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Brief description for post</p>
                            </div>



                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select a image</label>
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div hidden={showimg} className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label for="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Upload a file</span>
                                                <input onChange={onImageChange} ref={fileUploader} id="file-upload" name="file-upload" type="file" className="sr-only" required />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                    <div hidden={!showimg} className="space-y-1 text-center">
                                        <img src={img}></img>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default AddPost