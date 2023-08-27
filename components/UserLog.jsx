import { useState } from "react";
import { jose } from "./Fonts";
import axios from "axios";
import { popUp } from "./Modal";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export function unrevel() {
    document.body.style.overflow = "hidden"
    document.querySelector("#model").classList.replace("opacity-0", "opacity-100")
    document.querySelector("#model").classList.remove("pointer-events-none")
}

export function revel() {
    document.body.style.overflow = "auto"
    document.querySelector("#model").classList.replace("opacity-100", "opacity-0")
    document.querySelector("#model").classList.add("pointer-events-none")
}

export default function UserLog({ state }) {
    const [form, setForm] = useState(state || true)
    const [cookie, setCookie] = useCookies(["data"])
    const router = useRouter();

    return (
        <div id="model" className="fixed opacity-0 pointer-events-none z-20 bg-white bg-opacity-100 min-h-screen w-screen transition-opacity duration-300">

            {form ?
                <div className="flex flex-col gap-5 items-center pt-32 max-xl:pt-20">
                    <h3 className={`${jose.className} text-4xl pt-16`}>Log In Here.</h3>

                    <form onSubmit={(e) => {
                        document.getElementById("loginBtn").disabled = true;
                        e.preventDefault()

                        let data = {
                            "username": document.getElementById("email").value,
                            "password": document.querySelector("#password").value
                        };

                        let config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: `${process.env.SERVER_URL}/login`,
                            withCredentials: true,
                            data: data
                        };

                        axios.request(config)
                            .then((response) => {
                                // console.log(response.data);
                                popUp(response?.data?.message);
                                // console.log(response)
                                setCookie("data", JSON.stringify({
                                    name: response?.data?.name,
                                    username: response?.data?.username,
                                    email: response?.data?.email,
                                    profile: response?.data?.profile
                                }), {
                                    maxAge: 30 * 24 * 60 * 60
                                })
                                router.reload()
                            })
                            .catch((error) => {
                                document.getElementById("loginBtn").disabled = false
                                popUp(error.message + " (" + error?.response?.data?.message + ")");
                                console.log(error);
                            });

                    }} className="flex flex-col items-center gap-4">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="flex flex-col gap-2">
                                <input id="email" onKeyDown={(event) => {
                                    var key = event.keyCode;
                                    if (key === 32) {
                                        event.preventDefault();
                                    }
                                }} className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-200 rounded-md focus:border-black bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Username or Email" required />
                                <input id="password" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-200 rounded-md focus:border-black bg-transparent w-[370px] max-w-[90svw]`} type="password" placeholder="Password" required />
                            </div>
                            <button id="loginBtn" className="relative rounded-full flex p-3 xl:py-2 bg-blue-600 lg:hover:bg-blue-700 disabled:opacity-50 w-full transition-all duration-200" type="submit">
                                <span className={`${jose.className} duration-200 transition-opacity text-white text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>Login</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-0 ml-auto stroke-white flex-shrink-0">
                                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                </svg>
                            </button>
                        </div>
                        <span>No account? <button onClick={() => setForm(!form)} className="font-bold text-blue-600 lg:hover:text-blue-800" >Create one</button></span>
                    </form>

                    <button onClick={() => {
                        revel()
                    }} className="absolute right-5 top-20 group"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:group-hover:scale-125 transition-all duration-200 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="h-20"></div>

                    <p className="text-center text-zinc-400 absolute bottom-10 max-xl:bottom-20 text-xs w-[450px] max-w-[90svw]">Click “Log In” to agree to Reader's Terms of Service and acknowledge that Reader's Privacy Policy applies to you.</p>
                </div> :
                <div className="flex flex-col gap-5 items-center pt-32">
                    <h3 className={`${jose.className} text-4xl pt-20`}>New Sign Up.</h3>

                    <form id="form" onSubmit={(e) => {
                        e.preventDefault()
                        document.querySelector("input").disabled = true
                        document.querySelector("button").disabled = true
                        document.querySelector("#load").classList.remove("opacity-0")

                        let data = JSON.stringify({
                            "email": document.querySelector("#user").value
                        });

                        let config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: `${process.env.SERVER_URL}/signup/mail`,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data
                        };

                        axios.request(config)
                            .then((response) => {
                                // console.log(JSON.stringify(response.data));
                                popUp(response.data?.message)
                                document.querySelector("#load").classList.add("opacity-0")
                                document.querySelector("#done").classList.remove("opacity-0")
                            })
                            .catch((error) => {
                                // console.log(error);
                                popUp(error.message + " (" + error.response?.data + ")")
                                setTimeout(() => {
                                    document.querySelector("input").disabled = false
                                    document.querySelector("button").disabled = false
                                    document.querySelector("#err").classList.add("opacity-0")
                                }, 2000);
                                document.querySelector("#load").classList.add("opacity-0")
                                document.querySelector("#err").classList.remove("opacity-0")
                            });

                    }} className="flex flex-col items-center gap-4">
                        <div className="flex gap-2 items-center max-xl:max-w-[370px]">
                            <input id="user" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-200 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="email" placeholder="Email" required />
                            <button className="relative rounded-full flex xl:p-2 p-2 px-3 bg-blue-600 lg:hover:bg-blue-700 transition-all duration-200 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>

                                <span id="load" className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 transition-all duration-200 opacity-0">
                                    <svg width="22px" height="22px" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg" fill="currentColor" color="blue"><circle cx="12.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"><animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="12.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle></svg>
                                </span>

                                <span id="err" className="bg-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 transition-all duration-200 opacity-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>
                                </span>

                                <span id="done" className="bg-lime-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 transition-all duration-200 opacity-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </span>

                            </button>
                        </div>
                        <span>Already Have an Account? <button onClick={() => setForm(!form)} className="font-bold text-blue-600 lg:hover:text-blue-800" href={"#"}>Log In</button></span>
                    </form>

                    <button onClick={() => {
                        revel()
                    }} className="absolute right-5 top-20 group"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:group-hover:scale-125 transition-all duration-200 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="h-20"></div>

                    <p className="text-center text-zinc-400 absolute bottom-10 max-xl:bottom-20 text-xs w-[450px] max-w-[90svw]">Click “Sign Up” to agree to Reader's Terms of Service and acknowledge that Reader's Privacy Policy applies to you.</p>
                </div>}
        </div>
    );
}