import { jose } from "@/components/Fonts";
import { popUp } from "@/components/Modal";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function SignUp() {

  const router = useRouter();
  const token = router.query.token || null
  const [load, setLoad] = useState(true)
  const [form, setForm] = useState(1);
  const [msgUnique, setMsgUnique] = useState("");
  const [name, setName] = useState(null)
  const [email, setEmail] = useState("")
  const [uname, setUname] = useState(null)
  const [pass, setPass] = useState(null)
  const [file, setFile] = useState(null)
  const [cookie, setCookie] = useCookies(["data"])

  useEffect(() => {
    if (token) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.SERVER_URL}/signup/verify`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          setLoad(true)
          setEmail(response.data.email)
          document.getElementById("loading").classList.replace("flex", "hidden")
        })
        .catch((error) => {
          // console.log(error);
          setLoad(false)
          setEmail(error.response?.data?.message)
        });
    }
  }, [token])

  return (load ? (
    <>
      <Head>
        <title>SignUp New User</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={`relative flex max-xl:flex-col  xl:items-start min-h-[90svh] px-4 xl:px-16 max-xl:pb-10`}>

        {/* Right Hand Side */}
        <div className="flex flex-col items-center min-h-[90svh] flex-1 max-xl:w-full gap-10 py-5">
          <div id="loading" className="absolute z-10 flex flex-col items-center justify-center h-full w-full bg-white">
            <svg width="32px" height="32px" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" color="#000000"><g stroke="currentColor" fill="currentColor" transform="translate(2 1)" stroke-width="1.5" fill-rule="evenodd"><circle cx="42.601" cy="11.462" r="5"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="1;0;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="49.063" cy="27.063" r="5"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;1;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="42.601" cy="42.663" r="5"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;1;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="27" cy="49.125" r="5"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;1;0;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="11.399" cy="42.663" r="5"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;1;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="4.938" cy="27.063" r="5"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;1;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="11.399" cy="11.462" r="5"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;1;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="27" cy="5" r="5"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;0;1" calcMode="linear" repeatCount="indefinite"></animate></circle></g></svg>
            <span className="animate-pulse uppercase font-semibold text-zinc-500">Loading</span>
          </div>

          {/* Icon */}
          <span className="p-3 rounded-lg border">
            {form == 1 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
            </svg> : null}

            {form == 2 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
            </svg> : null}

            {form == 3 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
            </svg> : null}

          </span>

          {/* Form Header */}
          <section className="flex flex-col gap-1 items-center">
            {form == 1 ? <><label className={`${jose.className} text-3xl xl:text-4xl`}>Fill Details</label>
              <span className="font-light">Please provide your name and aquire a username.</span></> : null}

            {form == 2 ? <><label className={`${jose.className} text-3xl xl:text-4xl`}>Create a Password</label>
              <span className="font-light">Password must be at least 8 characters.</span></> : null}

            {form == 3 ? <><label className={`${jose.className} text-3xl xl:text-4xl`}>Add your Socials</label>
              <span className="font-light">Share articles to your social accounts.</span></> : null}

          </section>

          {/* Form 1 */}
          <div className={`flex max-xl:flex-col justify-around gap-6 w-full ${form == 1 ? "" : "pointer-events-none opacity-0 absolute"}`}>
            <section className="flex flex-col max-xl:items-center items-center gap-6 flex-1">
              <span className="flex flex-col">
                <label className={`${jose.className} text-lg translate-x-1`}>Email*</label>
                <input className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-30 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="email" placeholder="Email" value={email} required disabled />
              </span>

              <span className="flex flex-col">
                <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Name*</label>
                <input id="name" onKeyDown={(e)=>{
                  if (!(e.keyCode > 64 && e.keyCode < 91)) e.preventDefault()
                }} onBlur={(e) => {
                  if (e.target.value.length > 2) setName(e.target.value);
                  else setName(null)
                }} className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Enter your name" required maxLength={20} />
              </span>

              <span className="flex flex-col">
                <label htmlFor="username" className={`${jose.className} text-lg translate-x-1`}>Username*</label>
                <span className="flex gap-2">
                  <input onBlur={(e) => {
                    e.target.value = e.target.value.replace(/\s/g, "").toLowerCase()
                    if (e.target.value.length > 2) setUname(e.target.value)
                    else setUname(null)
                    setTimeout(() => {
                      document.getElementById("unique").click()
                    }, 200)
                  }} id="username" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent flex-shrink min-w-[315px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Choose a username" required />
                  <button onClick={() => {
                    if (!document.getElementById("username").value) return null;
                    if (document.getElementById("insideBtn").classList.contains("hidden")) document.getElementById("insideBtn").classList.remove("hidden")
                    axios.post(`${process.env.SERVER_URL}/signup/unique?username=${uname}`).then(res => {
                      // console.log(res.data);
                      setMsgUnique(null)
                    }).catch(err => {
                      // console.log(err.response.data.message);
                      setMsgUnique(err.response.data.message)
                    })
                  }} id="unique" className="relative overflow-hidden p-2 px-4 xl:px-3 flex-1 border border-zinc-800 xl:hover:bg-zinc-800 group transition-all duration-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-all duration-200 xl:group-hover:stroke-white">
                      <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>

                    <span id="insideBtn" className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white">
                      {msgUnique ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-lime-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                      }
                    </span>


                  </button>
                </span>
                <label className="text-sm self-center pt-1 text-red-500 font-semibold text-opacity-50">{msgUnique}</label>
              </span>
            </section>
            <section className="flex flex-col max-xl:items-center items-center gap-6 flex-1">

              <span className="flex flex-col gap-3">
                <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Select Avater</label>
                {!!file ? <img
                  id="imgDisplay"
                  src={file}
                  alt=""
                  class="h-40 w-40 rounded-full object-cover bg-slate-200 self-center"
                /> : <div className="flex flex-col items-center gap-2 flex-wrap h-32">
                  <span><input id="1p" type="radio" name="profile" className="hidden peer" value={"/1.webp"} /><label htmlFor="1p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/1.webp"} width={60} height={60} /></label></span>
                  <span><input id="2p" type="radio" name="profile" className="hidden peer" value={"/2.webp"} /><label htmlFor="2p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/2.webp"} width={60} height={60} /></label></span>
                  <span><input id="3p" type="radio" name="profile" className="hidden peer" value={"/3.webp"} /><label htmlFor="3p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/3.webp"} width={60} height={60} /></label></span>
                  <span><input id="4p" type="radio" name="profile" className="hidden peer" value={"/4.webp"} /><label htmlFor="4p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/4.webp"} width={60} height={60} /></label></span>
                  <span><input id="5p" type="radio" name="profile" className="hidden peer" value={"/5.webp"} /><label htmlFor="5p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/5.webp"} width={60} height={60} /></label></span>
                  <span><input id="6p" type="radio" name="profile" className="hidden peer" value={"/6.webp"} /><label htmlFor="6p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/6.webp"} width={60} height={60} /></label></span>
                  <span><input id="7p" type="radio" name="profile" className="hidden peer" value={"/7.webp"} /><label htmlFor="7p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/7.webp"} width={60} height={60} /></label></span>
                  <span><input id="8p" type="radio" name="profile" className="hidden peer" value={"/8.webp"} /><label htmlFor="8p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/8.webp"} width={60} height={60} /></label></span>
                  <span><input id="9p" type="radio" name="profile" className="hidden peer" value={"/9.webp"} /><label htmlFor="9p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/9.webp"} width={60} height={60} /></label></span>
                  <span><input id="10p" type="radio" name="profile" className="hidden peer" value={"/10.webp"} /><label htmlFor="10p" className="opacity-30 peer-checked:opacity-100 transition-all  duration-300 cursor-pointer"><Image className="rounded-full bg-zinc-100" src={"/10.webp"} width={60} height={60} /></label></span>
                </div>}

                {/* <hr className="my-4 w-2/3 border-zinc-400 self-center" /> */}

                <input onChange={(event) => {
                  const selectedFile = event.target.files[0];
                  if (!selectedFile) return setFile(null)
                  if (selectedFile.size > 1024 * 10000) {
                    popUp("Too Large File")
                    return null
                  }

                  const fileReader = new FileReader();

                  fileReader.onload = function (event) {
                    const fileContents = event.target.result;
                    setFile(fileContents)
                  };
                  fileReader.readAsDataURL(selectedFile);
                }} id="avatar" className={`${jose.className} my-3 text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-800 text-white rounded-md disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="file" accept="image/png, image/jpeg" />

              </span>


            </section>
          </div>

          {/* Form 2 */}
          <div className={`flex flex-col justify-around gap-6 w-full ${form == 2 ? "" : "pointer-events-none opacity-0 absolute"}`}>
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

          {/* Form 3 */}
          <div className={`flex flex-col justify-around items-center gap-6 w-full ${form == 3 ? "" : "pointer-events-none opacity-0 absolute"}`}>
            <span className="flex flex-col">
              <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Twitter (optional)</label>
              <span className="relative flex">
                <input id="twitter" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 pr-4 pl-10 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="twitter.com/@example" required />
                <span className="absolute p-3">
                  <img src="/twitter.svg" className="h-5 w-5 opacity-50 max-xl:translate-y-1" />
                </span>
              </span>
            </span>

            <span className="flex flex-col">
              <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>LinkedIn (optional)</label>
              <span className="relative flex">
                <input id="linkedin" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 pr-4 pl-10 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="linkedin.com/@example" required />
                <span className="absolute p-3">
                  <img src="/linkedin.svg" className="h-5 w-5 opacity-50 xl:-translate-y-1" />
                </span>
              </span>
            </span>

            <span className="flex flex-col">
              <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Instagram(optional)</label>
              <span className="relative flex">
                <input id="insta" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 pr-4 pl-10 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="instagram.com/@example" required />
                <span className="absolute p-3">
                  <img src="/instagram.svg" className="h-5 w-5 opacity-50 max-xl:translate-y-1" />
                </span>
              </span>
            </span>
          </div>

          {/* Prev Next Btn */}
          <section className="absolute flex gap-5 pt-10 pb-5 bottom-1">
            <button onClick={() => {
              setForm(1)
            }} className={`h-3 w-5 rounded-full transition-all duration-300 ${form == 1 ? "px-5 bg-blue-400" : "w-3 bg-zinc-300"}`}></button>
            <button onClick={() => {
              setForm(2)
            }} className={`h-3 w-5 rounded-full transition-all duration-300 ${form == 2 ? "px-5 bg-blue-400" : "bg-zinc-300"}`}></button>
            <button onClick={() => {
              setForm(3)
            }} className={`h-3 w-5 rounded-full transition-all duration-300 ${form == 3 ? "px-5 bg-blue-400" : "bg-zinc-300"}`}></button>
          </section>

        </div>

        {/* Submit Btn */}
        <button onClick={(e) => {

          let data = new FormData()
          data.append('name', name)
          data.append('username', uname)
          data.append('profile', file ? document.getElementById('avatar').files[0] : document.querySelector('input[name="profile"]:checked')?.value || "/1.webp");
          data.append('password', pass)
          data.append('twitter', document.getElementById('twitter').value || null)
          data.append('linkedin', document.getElementById('linkedin').value || null)
          data.append('insta', document.getElementById('insta').value || null)

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/signup`,
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            data: data,
          };

          // console.log(data)
          // console.log(document.getElementById('avatar').files[0])

          axios.request(config)
            .then((response) => {
              popUp(response.data.message)
              setCookie("data", JSON.stringify(response.data), {
                maxAge: 30 * 24 * 60 * 60,
              })
              setTimeout(() => {
                window.location.replace("/edit-profile");
              }, 2000);
            })
            .catch((error) => {
              // console.log(error);
              popUp(error.message + error.response?.data?.message)
            });

        }} id="submitBtn" className={`${jose.className} leading-tight items-end fixed flex gap-2 bottom-20 rounded-s right-0 bg-zinc-800 text-white font-semibold px-3 py-2 transition-all duration-200 ${name && uname && pass && !msgUnique ? null : 'translate-x-28'}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>Submit</button>

      </main >
    </>
  ) : <>
    <Head>
      <title>Oops Something Went Wrong...</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main className="relative flex items-center justify-center min-h-[90svh]">
      <div className="flex items-center gap-2 px-4">
        <Image src={"/sad.png"} width={200} height={200} />
        <section className="flex flex-col gap-2">
          <span className={`${jose.className}  font-semibold text-3xl`}>Oops Something Went Wrong...</span>
          <p className="text-2xl text-red-500 font-semibold">{email}</p>
          <p>Either it was used before or it expired for being too late.</p>
          <button className={`${jose.className} px-3 py-2 rounded-md bg-zinc-800 text-white text-lg`}>Sign Up Again</button>
        </section>
      </div>
    </main>
  </>)
}
