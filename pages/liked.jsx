import { jose } from "@/components/Fonts";
import { Refesh } from "@/components/Refesh";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import { motion as m } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { useCookies } from "react-cookie";

export async function getServerSideProps(ctx) {

    let cookie = ctx.req.cookies?.parallelVortex
    let userData = null;

    if (cookie) {
        userData = (await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/article/liked`,
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

    const [liked, setLiked] = useState(userData?.liked || [])

    return (
        <>
            <Head>
                <title>Liked Articles</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <m.main
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }} className={`relative flex flex-col min-h-[90svh] gap-3 px-4 xl:px-16 py-9`}>
                <section className="flex flex-wrap justify-between w-full gap-5">
                    <span className={`${jose.className} flex gap-2 max-xl:items-start xl:text-3xl text-2xl`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>Liked Articles</span>
                </section>

                <div className="flex gap-3 py-3 flex-wrap">
                    {liked.length > 0 ? liked.map(e => {
                        return (<span key={e._id} id={e._id} className="relative flex flex-col gap-3 p-1 bg-zinc-100 rounded-md overflow-hidden xl:w-[48%] w-full">
                            <div className="flex justify-center-center gap-2">
                                <Link href={`/user/${e.author.username}/${e.permalink}`}>
                                    <div className="shrink-0 relative grid place-items-center overflow-hidden h-full xl:w-40 w-32 rounded-md bg-slate-200">
                                        <Image className="object-cover shadow-md" loader={() => e.cover} src={e.cover} fill />
                                    </div>
                                </Link>
                                <div className="flex flex-col gap-1">
                                    <Link className={`${jose.className} text-xl line-clamp-1`} href={`/user/${e.author.username}/${e.permalink}`}>
                                        <span className={`p-1 rounded-md bg-zinc-200 mr-1 px-2`}>Title</span><span className="p-1">{e.title}</span>
                                    </Link>
                                    <Link href={`/user/${e.author.username}`} className={`${jose.className} flex items-center w-fit gap-1 line-clamp-1 px-2`}><div className="relative h-6 w-6 rounded-full overflow-hidden bg-slate-200"><Image loader={() => e.author.profile} src={e.author.profile} fill className="object-cover" /></div><span className="p-1">{e.author.name}</span>
                                    </Link>
                                </div>
                            </div>
                        </span>)
                    }) : <div className="rounded-md flex-1 flex items-center justify-center bg-zinc-100 h-32 w-full text-zinc-500 font-semibold">No Liked Articles</div>}
                </div>

                {!serverCookie ? <Unaccess /> : <></>}

            </m.main>
        </>
    )
}