import { jose } from "@/components/Fonts";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Refesh } from "@/components/Refesh"
import { popUp } from "@/components/Modal";
import { motion as m } from "framer-motion";
import { useState } from "react";

// import { useCookies } from "react-cookie";

export async function getServerSideProps(ctx) {

    let cookie = ctx.req.cookies?.parallelVortex
    let userData = null;

    if (cookie) {
        userData = (await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/user`,
            headers: {
                'Authorization': `Bearer ${cookie}`,
            }
        })).data
    }

    return {
        props: {
            data: ctx.req.cookies,
            userData
        }
    }
}

export default function Dashboard({ data, userData }) {
    let clientCookie = data?.data
    let serverCookie = data?.parallelVortex
    if (clientCookie) clientCookie = JSON.parse(data?.data)

    Refesh(data?.parallelVortex, data?.parallel)

    const [follow, setFollow] = useState([])

    function backtoDraft(id) {

        if (!id) return null

        axios.request({
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/article/${id}`,
            headers: {
                'Authorization': `Bearer ${data?.parallel}`,
            }
        }).then(res => {
            popUp(res.data.message)
            document.getElementById(id).remove()
        }).catch(err => {
            popUp(err.message + " " + err.response.data.message)
        })
    }

    function followers() {
        setFollow([])
        axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/user/followers`,
            headers: {
                'Authorization': `Bearer ${data?.parallel}`,
            }
        }).then(res => {
            // popUp(res.data.message)
            setFollow(res.data.followers)
        }).catch(err => {
            popUp(err.message + " " + err.response.data.message)
        })
    }

    function following() {
        setFollow([])
        axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/user/following`,
            headers: {
                'Authorization': `Bearer ${data?.parallel}`,
            }
        }).then(res => {
            // popUp(res.data.message)
            setFollow(res.data.following)
        }).catch(err => {
            popUp(err.message + " " + err.response.data.message)
        })
    }

    const ArticleCard = (id, img, title, date, des, link) => {
        date = new Date(date).toString().split(" ")
        return (
            <div id={id} className="relative flex flex-col gap-3 w-full rounded-md p-2">
                <div className="z-10 opacity-0 pointer-events-none flex flex-col gap-2 items-center justify-center absolute h-full w-full bg-slate-100 bg-opacity-40 backdrop-blur-[2px] transition-all duration-300">
                    <span className="text-xl font-bold">Are you sure ?</span>
                    <section className="flex gap-1">
                        <button onClick={(ele) => {
                            ele.target.disabled = true
                            backtoDraft(id)
                        }} className="py-1 px-5 bg-green-600 font-bold text-zinc-900/70 rounded-md disabled:opacity-40">Yes</button>
                        <button onClick={(e) => {
                            e.currentTarget.parentElement.parentElement.classList.replace("opacity-100", "opacity-0")
                            e.currentTarget.parentElement.parentElement.classList.add("pointer-events-none")
                        }} className="py-1 px-5 bg-red-600 font-bold text-zinc-900/70 rounded-md">No</button>
                    </section>
                </div>
                <Link href={link}>
                    <div className="relative rounded-md w-full h-56 overflow-hidden bg-zinc-200">
                        {img ? <Image className="rounded-md shadow object-cover xl:hover:scale-110 transition-all duration-300 cursor-pointer" loader={() => img} src={img} fill /> : <Image className="rounded-md shadow object-cover xl:hover:scale-110 transition-all duration-300" loader={() => "https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODk2OTg4Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"} src={"https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODk2OTg4Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"} fill />}
                    </div>
                </Link>
                <div className="flex flex-shrink flex-col gap-2">
                    <Link href={link}>
                        {title ? <span className={`${jose.className} text-xl line-clamp-1 mt-2 px-1 leading-6`}>{title}</span> : <span className={`${jose.className} text-xl line-clamp-1 mt-2 px-1 leading-6`}>Title</span>}
                    </Link>
                    {date ? <span className={`${jose.className} text-zinc-500 px-1 -translate-y-2`}>{date[1] + " " + date[2]}</span> : <span className={`text-zinc-300 font-semibold px-1 -translate-y-2`}>1 January, 2077</span>}
                    {des ? <p className="px-1 text-zinc-700 line-clamp-3">{des}</p> : <p className="px-1 text-zinc-500 line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae exercitationem molestias repellat ducimus! Quidem, fuga reiciendis sapiente voluptatum quibusdam repellendus. Ea et ratione possimus odio amet ducimus in officiis nisi!</p>}
                    <button onClick={(e) => {
                        e.currentTarget.parentElement.parentElement.children[0].classList.replace("opacity-0", "opacity-100")
                        e.currentTarget.parentElement.parentElement.children[0].classList.remove("pointer-events-none")
                    }} className="flex-1 rounded-md py-2 bg-zinc-950 text-white">Back to Draft</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <m.main
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }} className={`relative flex max-xl:flex-col xl:items-start min-h-[90svh] px-4 xl:px-16`}>

                <div className="flex flex-1 max-xl:w-full flex-col items-start gap-4 py-9">
                    <div className="flex items-center justify-between w-full">
                        <section className="flex flex-col gap-1">
                            <span className={`${jose.className} leading-6 xl:text-3xl text-2xl`}>Hey, {userData?.name || "----"}</span>
                            <span className="text-zinc-500 w-2/3 leading-4 text-sm">Good to have you back, have a look here</span>
                        </section>
                        <section className="flex max-xl:flex-col gap-3">
                            <Link href={"/edit-profile"} className="flex gap-1 items-center justify-center p-2 px-5 xl:px-8 rounded-md bg-zinc-900 hover:bg-zinc-950 max-lg:bg-zinc-950 text-white transition-all duration-300 font-semibold"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 max-lg:hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                            </svg>Edit Profile</Link>
                        </section>
                    </div>

                    <div className="flex flex-col gap-1 items-center w-full">
                        <section className="flex items-center max-lg:justify-between w-full gap-2 xl:gap-3">

                            <div onClick={() => {
                                following()
                                document.getElementById("banner").classList.replace("opacity-0", "opacity-100")
                                document.getElementById("banner").classList.remove("pointer-events-none")
                            }} className="flex-1 flex max-xl:w-full max-xl:justify-evenly items-center justify-center bg-zinc-100 rounded max-xl:p-5 xl:h-28 gap-3 shadow xl:hover:shadow-lg xl:hover:scale-105 transition-all duration-300 cursor-pointer">
                                <span className="max-lg:hidden p-2 rounded-full bg-lime-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-lime-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                </span>
                                <section className="flex flex-col items-center pt-3">
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>{userData?.following?.length || 0}</span>
                                    <span className="text-lime-500 text-opacity-80 font-semibold">following</span>
                                </section>
                            </div>

                            <div onClick={() => {
                                followers()
                                document.getElementById("banner").classList.replace("opacity-0", "opacity-100")
                                document.getElementById("banner").classList.remove("pointer-events-none")
                            }} className="flex-1 flex max-xl:w-full max-xl:justify-evenly items-center justify-center bg-zinc-100 rounded max-xl:p-5 xl:h-28 gap-3 shadow xl:hover:shadow-lg xl:hover:scale-105 transition-all duration-300 cursor-pointer">
                                <span className="max-lg:hidden p-2 rounded-full bg-sky-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-sky-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </span>
                                <section className="flex flex-col items-center pt-3">
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>{userData?.followers.length || 0}</span>
                                    <span className="text-sky-500 text-opacity-80 font-semibold">followers</span>
                                </section>
                            </div>

                            <div className="flex-1 flex max-xl:w-full max-xl:justify-evenly items-center justify-center bg-zinc-100 rounded max-xl:p-5 xl:h-28 gap-3 shadow xl:hover:shadow-lg xl:hover:scale-105 transition-all duration-300 cursor-pointer">
                                <span className="max-lg:hidden p-2 rounded-full bg-purple-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-purple-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                </span>
                                <section className="flex flex-col items-center pt-3">
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>{userData?.comments?.length || 0}</span>
                                    <span className="text-purple-500 text-opacity-80 font-semibold">comments</span>
                                </section>
                            </div>

                        </section>
                        <span className="font-semibold text-zinc-400 text-opacity-50 text-sm">Click for more info</span>
                    </div>

                    <span className="bg-zinc-200 w-full rounded-md p-1 flex gap-1">
                        <Link href={"/draft"} className="bg-white w-full rounded-md flex gap-2 justify-center p-2 xl:text-xl font-semibold text-zinc-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 max-xl:hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>Drafted Articles</Link>
                        <Link href={"/liked"} className="bg-white w-full rounded-md flex gap-2 justify-center p-2 xl:text-xl font-semibold text-zinc-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 max-xl:hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>Liked Articles</Link>
                    </span>

                    <div className="flex flex-col gap-2 w-full">
                        <span className={`${jose.className} text-2xl`}>Published Articles</span>
                        <section className="grid md:grid-cols-2 gap-1 lg:grid-cols-3 xl:grid-cols-4">
                            {userData?.articles?.length > 0 ? userData.articles.map(e => {
                                return (
                                    ArticleCard(e._id, e.cover, e.title, e.createdAt, e.description, `/user/${userData.username}/${e.permalink}`)
                                )
                            }) : <div className="flex items-center justify-center bg-zinc-200/20 rounded-md w-full min-h-[300px]">
                                <span className={`${jose.className} flex gap-2 text-lg text-zinc-600 px-2 py-1 rounded-md bg-slate-200 cursor-pointer`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>Write New Articles</span>
                            </div>}
                        </section>
                    </div>
                </div>

                {/* Banner Model */}
                <div id="banner" className="fixed flex flex-col items-center justify-center gap-2 bg-white bg-opacity-20 min-h-[95svh] w-full max-w-[2000px] transit duration-200 opacity-0 pointer-events-none xl:-translate-x-16 -translate-x-4">
                    <div className="flex flex-col gap-1 rounded-md bg-white w-72 xl:h-96 h-60 shadow-md border -translate-y-8 overflow-auto">
                        <section className={`${jose.className} flex text-lg border-b justify-between p-3 shadow`}>Info<svg onClick={(e) => {
                            e.currentTarget.parentElement.parentElement.parentElement.classList.replace("opacity-100", "opacity-0")
                            e.currentTarget.parentElement.parentElement.parentElement.classList.add("pointer-events-none")
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="xl:hover:scale-105 w-6 h-6 transition-transform cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg></section>

                        {follow.length > 0 ? follow.map(e => {
                            return (<div key={e.username} id={e.username} className="mx-1 rounded-md bg-zinc-200/70 p-2 flex items-center justify-between">
                                <section className="flex items-center gap-2">
                                    <span className="h-12 w-12 bg-slate-200 relative rounded-full overflow-hidden">
                                        <Link href={`/user/${e.username}`}>
                                            <Image className="object-cover" loader={() => e.profile} src={e.profile} fill />
                                        </Link>
                                    </span>
                                    <Link href={`/user/${e.username}`}>
                                        <section className="flex flex-col">
                                            <span className={`${jose.className} opacity-40 text-sm`}>{e.username}</span>
                                            <span className={`${jose.className}`}>{e.name}</span>
                                        </section>
                                    </Link>
                                </section>
                            </div>)
                        }) : <svg className="m-auto" width="32px" height="32px" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" color="#000000"><defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="tail-spin_svg__a_15"><stop stopColor="currentColor" stopOpacity="0" offset="0%"></stop><stop stopColor="currentColor" stopOpacity=".631" offset="63.146%"></stop><stop stopColor="currentColor" offset="100%"></stop></linearGradient></defs><g transform="translate(1 1)" fill="none" fillRule="evenodd"><path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#tail-spin_svg__a_15)" strokeWidth="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></path><circle fill="#fff" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></circle></g></svg>}

                    </div>
                </div>


                {/* <div className="xl:border-l xl:py-9 xl:pl-9 min-h-screen xl:mr-0 xl:ml-auto flex flex-col gap-10">

                </div> */}
                {!serverCookie ? <Unaccess /> : <></>}
            </m.main>
        </>
    )
}
