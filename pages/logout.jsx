import { jose } from "@/components/Fonts"
import { popUp } from "@/components/Modal"
import Unaccess from "@/components/Unaccess"
import axios from "axios"
import { motion as m } from "framer-motion"
import Head from "next/head"

export async function getServerSideProps(ctx) {

    return {
        props: {
            data: ctx.req.cookies,
        }
    }
}

export default function Logout({ data }) {
    let clientCookie = data?.data
    let serverCookie = data?.parallelVortex
    if (clientCookie) clientCookie = JSON.parse(data?.data)

    return (
        <>
            <Head>
                <title>Logout</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <m.main
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }} className={`relative flex items-center justify-center max-xl:w-full min-h-[90svh] gap-4`}>
                <div className="flex flex-col gap-4 p-3 items-center justify-center max-xl:-translate-y-32 -translate-y-12">
                    <img className="rounded-full h-40 w-40 bg-zinc-500 object-cover" src={clientCookie?.profile} alt="" />
                    <span className={`${jose.className} text-2xl`}>Are you sure want to logout ?</span>
                    <button onClick={() => {
                        axios.request({
                            method: "POST",
                            url: `${process.env.SERVER_URL}/logout`,
                            maxBodyLength: Infinity,
                            headers: {
                                'Authorization': `Bearer ${serverCookie}`
                            }
                        }).then(res => {
                            axios.post("/api/login").then(res => {
                                popUp("Logged Out")
                                setTimeout(() => {
                                    window.location.replace("/")
                                }, 200);
                            }).catch(err => {
                                popUp(err.message)
                            })
                        }).catch(err => {
                            popUp(err.message + " " + err.statusText)
                        })
                    }} className="bg-zinc-800 flex justify-center gap-2 hover:bg-zinc-900 transition-colors duration-150 text-white text-center font-semibold py-1 max-xl:py-2 w-full rounded-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>Logout</button>
                </div>
                {!serverCookie ? <Unaccess /> : <></>}
            </m.main>
        </>
    )
}