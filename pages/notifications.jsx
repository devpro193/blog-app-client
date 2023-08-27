import { jose } from "@/components/Fonts";
import { Refesh } from "@/components/Refesh";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import { motion as m } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps(ctx) {

    let cookie = ctx.req.cookies?.parallelVortex
    let userData = null;

    if (cookie) {
        userData = (await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/user/notifications`,
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

export default function Draft({ data, userData }) {
    let clientCookie = data?.data
    let serverCookie = data?.parallelVortex
    if (clientCookie) clientCookie = JSON.parse(data?.data)

    Refesh(data?.parallelVortex, data?.parallel)

    const [notifications, setNotifications] = useState(userData || [])

    return (
        <>
            <Head>
                <title>Notifications</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <m.main
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }} className={`relative flex flex-col min-h-[90svh] gap-3 px-4 xl:px-16 py-9`}>
                <section className="flex flex-wrap justify-between w-full gap-5">
                    <span className={`${jose.className} flex gap-2 max-xl:items-start xl:text-3xl text-2xl`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                    </svg>All Notifications</span>
                </section>

                <div className="flex flex-col gap-3 py-3">
                    {notifications.length > 0 ? notifications.map(e => {
                        let date = new Date(e?.createdAt || "2012").toString().split(" ")
                        if (e.notificationType == "follow") {
                            return <span className="p-3 rounded bg-zinc-50 flex items-center gap-2 justify-between" onClick={() => { document.getElementById("notify").classList.replace("h-auto", "h-0") }}>
                                <section className="flex items-center gap-2">
                                    <span className="p-2 bg-lime-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-lime-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </span>
                                    <section className={`flex flex-col py-2`}>
                                        <span className={`lg:text-lg leading-5 line-clamp-2`}><Link href={`user/${e.user.username}`} className="font-medium underline">{e.user.name}</Link> started following you</span>
                                        <span className="max-lg:text-sm font-medium text-zinc-400">{date[2]} {date[1]}</span>
                                    </section>
                                </section>
                                <Link href={`user/${e.user.username}`} className={`${jose.className} w-fit px-4 py-1 rounded-full border max-lg:hidden border-zinc-900`}>View Profile</Link>
                                <Link href={`user/${e.user.username}`} className={`${jose.className} bg-zinc-100 p-2 rounded-full lg:hidden`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg></Link>
                            </span>
                        }
                        if (e.notificationType == "liked") {
                            return <span className="p-3 rounded bg-zinc-50 flex items-center justify-between" onClick={() => { document.getElementById("notify").classList.replace("h-auto", "h-0") }}>
                                <section className="flex items-center gap-2">
                                    <span className="p-2 bg-red-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-red-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </span>
                                    <section className={`flex flex-col py-2`}>
                                        <span className={`lg:text-lg leading-5 line-clamp-2`}><Link href={`user/${e.user.username}`} className="font-medium underline">{e.user.name}</Link> liked your article titled {e.article.title}</span>
                                        <span className="max-lg:text-sm font-medium text-zinc-400">{date[2]} {date[1]}</span>
                                    </section>
                                </section>
                                <Link href={`user/${clientCookie?.username}/${e.article.permalink}`} className={`${jose.className} w-fit px-4 py-1 rounded-full border max-lg:hidden border-zinc-900`}>See Article</Link>
                                <Link href={`user/${clientCookie?.username}/${e.article.permalink}`} className={`${jose.className} bg-zinc-100 p-2 rounded-full lg:hidden`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg></Link>
                            </span>
                        }

                        if (e.notificationType == "comment") {
                            return <span className="p-3 rounded bg-zinc-50 flex items-center justify-between" onClick={() => { document.getElementById("notify").classList.replace("h-auto", "h-0") }}>
                                <section className="flex items-center gap-2">
                                    <span className="p-2 bg-purple-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-purple-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </span>
                                    <section className={`flex flex-col py-2`}>
                                        <span className={`lg:text-lg leading-5 line-clamp-2`}><Link href={`user/${e.user.username}`} className="font-medium underline">{e.user.name}</Link> commented on your article titled {e.article.title}</span>
                                        <span className="max-lg:text-sm font-medium text-zinc-400">{date[2]} {date[1]}</span>
                                    </section>
                                </section>
                                <Link href={`user/${clientCookie?.username}/${e.article.permalink}`} className={`${jose.className} w-fit px-4 py-1 rounded-full border max-lg:hidden border-zinc-900`}>Read Comment</Link>
                                <Link href={`user/${clientCookie?.username}/${e.article.permalink}`} className={`${jose.className} bg-zinc-100 p-2 rounded-full lg:hidden`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg></Link>
                            </span>
                        }
                    }) : <div className="rounded-md flex-1 flex items-center justify-center bg-zinc-100 h-32 w-full text-zinc-500 font-semibold m-auto">No Notifications Yet</div>}
                </div>

                {!serverCookie ? <Unaccess /> : <></>}

            </m.main>
        </>
    )
}