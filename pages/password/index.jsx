import { jose } from "@/components/Fonts";
import { popUp } from "@/components/Modal";
import { Refesh } from "@/components/Refesh";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import { motion as m } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Password() {

    const [user, setUser] = useState(null)

    function verifyUser() {

        if (!user) return null
        document.getElementById("btn").disabled = true

        axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/login/password/?username=${user}`,
        }).then(res => {
            console.log(res);
            popUp(res.data.message)
            document.getElementById("btn").disabled = false
        }).catch(err => {
            console.log(err);
            popUp(err.message + " " + err.response.data.message)
            document.getElementById("btn").disabled = false
        })
    }

    return (
        <>
            <Head>
                <title>Change Password</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <m.main
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }} className={`relative flex items-center flex-col min-h-[85svh] gap-3 px-4 xl:px-16 py-9 w-full`}>
                <section className="flex flex-col items-center gap-5">
                    <span className={`p-3 border rounded-md w-fit`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                    </svg></span>
                    <label className={`${jose.className} text-3xl xl:text-4xl`}>Change Password</label>
                </section>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    verifyUser()
                }} className={`flex flex-col justify-around gap-6 p-10`}>
                    <section className="flex flex-col max-xl:items-center items-center gap-6 flex-1">
                        <span className="flex flex-col">
                            <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Username or Email</label>
                            <input onKeyUp={(e) => {
                                setUser(e.target.value)
                            }} className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Enter here" required />
                        </span>
                    </section>

                    <button id="btn" type="submit" className={`${jose.className} px-5 py-2 rounded-md bg-zinc-800 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg`}>Send Verificaion Mail</button>
                </form>

            </m.main>
        </>
    )
}