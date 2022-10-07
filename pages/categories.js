import React from 'react'
import { MdOutlineWork } from 'react-icons/md'
import { FcIdea } from 'react-icons/fc'
import { GoCommentDiscussion } from 'react-icons/go'
import { AiOutlineComment } from 'react-icons/ai'
import { FaNetworkWired } from 'react-icons/fa'
import { ImNewspaper } from 'react-icons/im'
import Link from 'next/link'
const Categories = () => {
    return (
        <div>
            <section class="text-gray-600 body-font pb-20">
                <div class="container sm:px-5 px-1 sm:py-24 pt-5 mx-auto flex flex-wrap">

                    <div class="flex flex-wrap flex-col sm:flex-row w-full md:-m-2 -m-1">
                        <div class="flex flex-wrap sm:w-1/2">
                            <Link href='/category/popular-works'>
                                <div class="md:p-2 p-1 w-1/2 bg-[#e94e48] text-gray-50 flex ">
                                    <div className='my-5'>
                                        <MdOutlineWork size={60} />
                                    </div>
                                    <div className='my-auto mx-4'>
                                        <h1 class="title-font sm:text-xl text-md font-medium text-gray-100 mb-3">Popular in Works</h1>
                                        <a href="#" class="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-950">
                                            Explore
                                            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        </a>
                                    </div>
                                </div>
                            </Link>
                            <Link href='/category/popular-ideas'>
                                <div class="md:p-2 p-1 w-1/2 bg-[#eaeaea] flex">
                                    <div className='my-5'>
                                        <FcIdea size={60} />
                                    </div>
                                    <div className='my-auto mx-4'>
                                        <h1 class="title-font sm:text-xl text-md font-medium text-rose-600 mb-3">Popular in ideas</h1>
                                        <a href="#" class="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-950">
                                            Explore
                                            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        </a>
                                    </div>

                                </div></Link>
                            <Link href='/category/popular-discussions'>
                                <div class="md:p-2 p-1 text-xl w-full bg-[#11345c] flex ">
                                    <div className='my-5 text-gray-100'>
                                        <GoCommentDiscussion size={100} />
                                    </div>
                                    <div className='my-auto mx-4'>
                                        <h1 class="title-font sm:text-xl text-xl font-medium text-gray-50 mb-3">Popular in Discussion</h1>
                                        <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Participate in popular discussions around the glob.</h2>
                                        <a href="#" class="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-800">
                                            Explore
                                            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        </a>
                                    </div>

                                </div></Link>
                        </div>
                        <div class="flex flex-wrap sm:w-1/2">
                            <Link href='/addpost'>
                                <div class="md:p-2 p-1 w-full  bg-[#f6f27c] px-8 flex">
                                    <div className='my-5 text-blue-900'>
                                        <AiOutlineComment size={120} />
                                    </div>
                                    <div className='my-auto mx-4'>
                                        <h1 class="title-font sm:text-xl text-xl font-medium text-blue-900 mb-3">Start a new Discussion</h1>
                                        <h2 class="tracking-widest text-xs title-font font-medium text-blue-600 mb-1">Let's create a new idea to welcome creators for discussion. </h2>
                                        <a href="#" class="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-800">
                                            Let's create
                                            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        </a>
                                    </div>
                                </div></Link>
                            <Link href='/addpost'>
                                <div class="md:p-2 p-1 w-1/2 bg-[#54bcb6] flex">
                                    <div className='my-5 text-blue-900'>
                                        <FaNetworkWired size={60} />
                                    </div>
                                    <div className='my-auto mx-4'>
                                        <h1 class="title-font sm:text-xl text-md font-medium text-gray-50 mb-3">Want a skilled guy?</h1>
                                        <a href="#" class="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-800">
                                            Create Work
                                            {/* <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
                                        </a>
                                    </div>

                                </div></Link>
                            {/* <Link href='/category/popular-works'> */}
                            <div class="md:p-2 p-1 w-1/2 bg-[#e94e48] flex">
                                <div className='my-5 text-gray-50'>
                                    <ImNewspaper size={60} />
                                </div>
                                <div className='my-auto mx-4'>
                                    <h1 class="title-font sm:text-xl text-md font-medium text-gray-100 mb-3">Today's Highlights</h1>
                                    <a href="#" class="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-950">
                                        Coming soon
                                        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </div>

                            </div>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Categories