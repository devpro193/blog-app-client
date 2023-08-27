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
// import { useCookies } from "react-cookie";

export async function getServerSideProps({ params }) {

    let data = null;

    try {
        data = (await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/login/password`,
            headers: {
                'Authorization': `Bearer ${params?.password}`,
            }
        })).data
    } catch (err) {
        data = null
    }

    return {
        props: {
            token: params?.password,
            data
        }
    }

}

export default function PassCheck({ data, token }) {

    const [pass, setPass] = useState(null)

    function changePass() {

        if (!pass) return null
        document.getElementById("btn").disabled = true

        axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/login/password`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: {
                pass
            }
        }).then(res => {
            console.log(res);
            popUp(res.data.message)
            document.getElementById("btn").disabled = false
            setTimeout(() => {
                window.location.replace("/")
            }, 2000);
        }).catch(err => {
            console.log(err);
            popUp(err.message + " " + err.response.data.message)
            document.getElementById("btn").disabled = false
        })
    }

    return !!data ? (
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

                <div className={`flex flex-col justify-around gap-6 w-full p-5`}>
                    <section className="flex flex-col max-xl:items-center items-center gap-6 flex-1">
                        <span className="flex flex-col">
                            <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>New Password</label>
                            <input onChange={(e) => {
                                setPass(null)
                                if (!e.target.value) return document.getElementById("passMsg").textContent = "Password is null"
                                if (e.target.value.length < 8) return document.getElementById("passMsg").textContent = "Password is too short"
                                if (e.target.value != document.querySelector("#pass2").value) return document.getElementById("passMsg").textContent = "Password Unequal"
                                document.getElementById("passMsg").textContent = "Password Matched"
                                setPass(e.target.value)
                            }} id="pass" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="password" placeholder="Password" required />
                        </span>
                    </section>
                    <section className="flex flex-col max-xl:items-center items-center gap-6 flex-1">
                        <span className="flex flex-col">
                            <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Confirm Password</label>
                            <input onChange={(e) => {
                                setPass(null)
                                if (!e.target.value) return document.getElementById("passMsg").textContent = "Password is null"
                                if (e.target.value != document.querySelector("#pass").value) return document.getElementById("passMsg").textContent = "Password Unequal"
                                document.getElementById("passMsg").textContent = "Password Matched"
                                setPass(e.target.value)
                            }} id="pass2" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="password" placeholder="Password Again" required />
                        </span>
                        <p id="passMsg" className="font-semibold text-sm opacity-50 select-none">Password is null</p>
                    </section>
                </div>

                <button id="btn" onClick={(e) => {
                    changePass()
                }} className={`${jose.className} px-3 py-1 rounded-full bg-zinc-800 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${pass ? "scale-100" : "scale-0 pointer-events-none"}`}>Change</button>
            </m.main>
        </>
    ) : (<>
        <Head>
            <title>Change Password</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <main className={`flex flex-col gap-1 items-center justify-center min-h-[90svh] px-4 xl:px-16`}>
            <span className="relative h-60 w-60 overflow-hidden">
                <Image src={"/404.jpg"} className="object-cover" fill />
            </span>
            <span className={`${jose.className} text-xl`}>Oops.. Maybe token has been used or expired</span>
        </main>
    </>)
}