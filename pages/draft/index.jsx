import { jose } from "@/components/Fonts";
import { popUp } from "@/components/Modal";
import { Refesh } from "@/components/Refesh";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import { motion as m} from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

export async function getServerSideProps(ctx) {

    let cookie = ctx.req.cookies?.parallelVortex
    let userData = null;

    if (cookie) {
        userData = (await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/article/draft`,
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

    const [title, setTitle] = useState(null)

    function draftIt() {

        if (!title) return null

        axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/article/draft`,
            headers: {
                'Authorization': `Bearer ${serverCookie}`,
            },
            data: {
                title
            }
        }).then(res => {
            console.log(res);
            popUp(res.data.message)
            window.location.reload()
        }).catch(err => {
            popUp(err.message + " " + err.response.data.message)
        })
    }

    function deleteDraft(id) {

        if (!id) return null

        axios.request({
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/article/draft/${id}`,
            headers: {
                'Authorization': `Bearer ${data?.parallel}`,
            }
        }).then(res => {
            console.log(res);
            popUp(res.data.message)
            document.getElementById(id).remove()
        }).catch(err => {
            popUp(err.message + " " + err.response.data.message)
        })
    }

    return (
        <>
            <Head>
                <title>Drafted Articles</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <m.main
                animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }} className={`relative flex flex-col min-h-[90svh] gap-3 px-4 xl:px-16 py-9`}>
                <section className="flex flex-wrap justify-between w-full gap-5">
                    <span className={`${jose.className} flex gap-2 max-xl:items-start xl:text-3xl text-2xl`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                    </svg>Drafted Articles</span>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }} className={`${jose.className} flex text-lg max-xl:w-full`}>
                        <input onChange={(e) => {
                            setTitle(e.target.value)
                        }} placeholder="Give a Title..." className="rounded-s-full flex-1 w-80 px-3 py-2 border outline-none" type="text" />
                        <button type="submit" onClick={(e) => {
                            draftIt()
                            e.target.disabled = true
                        }} className="rounded-e-full px-3 py-2 bg-zinc-800 text-white disabled:opacity-40">Quick Draft</button>
                    </form>
                </section>

                <div className="flex gap-3 py-3 flex-wrap">
                    {userData?.draft.map(e => {
                        let date = new Date(e?.createdAt || "2012").toString().split(" ")
                        return (<span key={e._id} id={e._id} className="relative flex flex-col gap-3 p-1 bg-zinc-100 rounded-md overflow-hidden xl:max-w-sm max-xl:w-[48%]">
                            <div className="z-10 opacity-0 pointer-events-none flex flex-col gap-2 items-center justify-center absolute h-full w-full bg-slate-100 bg-opacity-40 backdrop-blur-[2px] transition-all duration-300">
                                <span className="text-xl font-bold">Are you sure ?</span>
                                <section className="flex gap-1">
                                    <button onClick={(ele) => {
                                        ele.target.disabled = true
                                        deleteDraft(e._id)
                                    }} className="py-1 px-5 bg-green-600 font-bold text-zinc-900/70 rounded-md disabled:opacity-40">Yes</button>
                                    <button onClick={(e) => {
                                        e.currentTarget.parentElement.parentElement.classList.replace("opacity-100", "opacity-0")
                                        e.currentTarget.parentElement.parentElement.classList.add("pointer-events-none")
                                    }} className="py-1 px-5 bg-red-600 font-bold text-zinc-900/70 rounded-md">No</button>
                                </section>
                            </div>

                            <div className="flex flex-col justify-center-center gap-2">
                                <div className="relative grid place-items-center overflow-hidden h-40 w-full rounded-md bg-slate-200">
                                    {e?.cover ? <Image className="object-cover shadow-md" loader={() => e.cover} src={e.cover} fill /> : <span className="text-zinc-700 font-semibold">NO IMAGE</span>}
                                </div>
                                <div className="flex flex-col px-1 gap-1">
                                    <label className="text-zinc-600 font-bold">Last Updated: {`${date[1]} ${date[2]}`}</label>
                                    <label className={`${jose.className} text-xl line-clamp-1 w-80`}><span className={`p-1 rounded-md bg-zinc-200 mr-1 px-2`}>Title</span><span className="p-1">{e.title}</span></label>
                                </div>
                            </div>
                            <section className="flex gap-1 w-full">
                                <Link href={`/draft/${e._id}`} className="py-2 flex-1 h-fit rounded bg-zinc-800 xl:hover:bg-slate-900 text-white font-semibold uppercase flex gap-2 justify-center transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>Edit</Link>
                                <button onClick={(e) => {
                                    e.currentTarget.parentElement.parentElement.children[0].classList.replace("opacity-0", "opacity-100")
                                    e.currentTarget.parentElement.parentElement.children[0].classList.remove("pointer-events-none")
                                }} className="p-2 h-fit rounded bg-zinc-800 xl:hover:bg-slate-900 text-white font-semibold uppercase flex gap-2 justify-center transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg></button>
                            </section>
                        </span>)
                    })}
                </div>

                {userData?.draft[0] ? <></> : <div className="rounded-md flex-1 flex items-center justify-center bg-zinc-100 h-full w-full text-zinc-700 font-semibold">No drafts</div>}

                {!serverCookie ? <Unaccess /> : <></>}

            </m.main>
        </>
    )
}