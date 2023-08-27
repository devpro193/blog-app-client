import { jose } from "@/components/Fonts";
import { popUp } from "@/components/Modal";
import { Refesh } from "@/components/Refesh";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import { motion as m } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

export async function getServerSideProps(ctx) {

  let cookie = ctx.req.cookies?.parallelVortex
  let userData = null;

  if (cookie) {
    userData = (await axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.SERVER_URL}/user/edit`,
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

export default function Edit({ data, userData }) {
  let clientCookie = data?.data
  let serverCookie = data?.parallelVortex
  if (clientCookie) clientCookie = JSON.parse(data?.data)

  Refesh(data?.parallelVortex, data?.parallel)

  const [file, setFile] = useState(userData?.profile || null)
  const [cover, setCover] = useState(userData?.cover || null)
  const [name, setName] = useState(userData?.name || null)
  const [about, setAbout] = useState(userData?.about || null)
  const [company, setCompany] = useState(userData?.company || null)
  const [designation, setDesignation] = useState(userData?.designation || null)

  useEffect(() => {
    document.getElementById("name").value = name
    document.getElementById("about").value = about
    document.getElementById("company").value = company
    document.getElementById("designation").value = designation
    document.getElementById('twitter').value = userData?.socials[0] || null
    document.getElementById('linkedin').value = userData?.socials[1] || null
    document.getElementById('insta').value = userData?.socials[2] || null
  })

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <m.main
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }} className={`relative flex max-xl:flex-col  xl:items-start min-h-[90svh] px-4 xl:px-16`}>

        <div className="flex flex-1 max-xl:w-full flex-col items-start gap-4 py-9">
          <div className="flex items-end justify-between w-full">
            <section className="flex flex-col gap-1">
              <span className={`${jose.className} flex gap-2 max-xl:items-start xl:text-3xl text-2xl`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>Edit Profile</span>
            </section>
            <section className="flex max-xl:flex-col gap-3">
              <Link href={"/dashboard"} className="flex gap-1 items-center justify-center p-2 px-5 xl:px-8 rounded-md bg-zinc-800 hover:bg-zinc-900 max-lg:bg-zinc-900 text-white transition-all duration-300 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 max-lg:hidden">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                </svg>Dashboard</Link>
            </section>
          </div>

          <div className="flex flex-col max-xl:items-center gap-3 py-3 max-xl:w-full">
            <span className={`${jose.className} flex gap-2 text-2xl`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>Personal Info</span>
            <div className="flex max-xl:flex-col gap-6">
              <section className="flex flex-col gap-3">
                <span className="flex flex-col">
                  <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Name</label>
                  <input onBlur={(e) => {
                    if (e.target.value.length < 3) return setName(null)
                    setName(e.target.value)
                  }} id="name" className={`${name ? "bg-zinc-100" : "bg-red-100"} outline-none py-3 max-xl:py-4 px-4 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Enter your name" required maxLength={20} minLength={3} />
                </span>
                <span className="flex flex-col">
                  <label htmlFor="company" className={`${jose.className} text-lg translate-x-1`}>Company</label>
                  <input onBlur={(e) => {
                    setCompany(e.target.value)
                  }} id="company" className={` outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Enter your workplace" required maxLength={20} />
                </span>
                <span className="flex flex-col">
                  <label htmlFor="designation" className={`${jose.className} text-lg translate-x-1`}>Designation</label>
                  <input onBlur={(e) => {
                    setDesignation(e.target.value)
                  }} id="designation" className={` outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Enter your designation" required maxLength={20} />
                </span>
              </section>

              <section className="flex flex-col gap-3">
                <span className="flex flex-col">
                  <label htmlFor="about" className={`${jose.className} text-lg translate-x-1`}>About</label>
                  <textarea onBlur={(e) => {
                    setAbout(e.target.value)
                  }} className={`outline-none py-3 max-xl:py-4 px-4 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent h-20 w-[370px] xl:w-[500px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Write about yourself to let people know about you..." name="about" id="about" maxLength={300} />
                </span>
                <span className="flex flex-col max-xl:mb-3">
                  <label htmlFor="cover" className={`${jose.className} flex gap-2 justify-between text-lg translate-x-1 pr-2 pb-1`}>Cover <button onClick={() => {
                    document.querySelector("#unsplash").scroll({ behavior: "smooth" })
                    document.getElementById("imgModal").classList.replace("opacity-0", "opacity-100")
                    document.getElementById("imgModal").classList.remove("pointer-events-none")
                  }} className="text-sm rounded px-2 bg-zinc-700/20">Unsplash</button></label>
                  <div onClick={() => {
                    document.getElementById("cover").click()
                  }} className={`relative bg-zinc-100 flex items-center justify-center rounded-md h-24 w-[370px] xl:w-[500px] max-w-[90svw] cursor-pointer`} >
                    <span className="text-sm font-semibold flex gap-1 items-center text-zinc-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>Upload Cover Image</span>
                    {cover ? <img src={cover} className="object-cover w-full h-full absolute" alt="" /> : <></>}
                  </div>
                  <button onClick={() => {
                    setCover(null)
                  }} className={`${cover ? null : "hidden"} p-1 w-full xl:hover:bg-zinc-900 bg-zinc-800 flex items-center justify-center text-white`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </span>
                <input onChange={(event) => {
                  const selectedFile = event.target.files[0];
                  if (!selectedFile) return null
                  if (selectedFile.size > 1024 * 10000) {
                    popUp("Too Large File")
                    return null
                  }
                  const fileReader = new FileReader();

                  fileReader.onload = function (event) {
                    const fileContents = event.target.result;
                    setCover(fileContents)
                  };
                  fileReader.readAsDataURL(selectedFile);
                }} className="hidden" id="cover" type="file" accept="image/png, image/jpeg" />
              </section>

              <section className="flex flex-col gap-2">
                <label htmlFor="profile" className={`${jose.className} text-lg translate-x-1`}>Profile</label>
                <div className="relative overflow-hidden h-40 w-40 rounded-full  bg-slate-200 self-center mx-8 my-auto">
                  <img
                    id="profile"
                    src={file}
                    className="absolute h-40 w-40 object-cover"
                  />
                  <div onClick={() => {
                    document.getElementById('avatar').click()
                  }} className={`absolute flex items-center justify-center xl:hover:opacity-50 h-40 w-40 rounded-full ${file ? "opacity-0" : "opacity-50"} bg-zinc-600/40 transition-opacity cursor-pointer`}>
                    <span className="uppercase font-semibold">upload</span>
                  </div>
                </div>

                <span onClick={() => {
                  setFile(null)
                }} className={`${file ? null : "hidden"} p-2 rounded-full shadow-md w-fit m-auto xl:hover:bg-slate-50 cursor-pointer transition-all`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </span>

                <input onChange={(event) => {
                  const selectedFile = event.target.files[0];
                  if (!selectedFile) return null
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
                }} className="hidden" id="avatar" type="file" accept="image/png, image/jpeg" />

              </section>

            </div>
          </div>

          <div className="flex flex-col max-xl:items-center gap-3 py-3 max-xl:w-full">
            <span className={`${jose.className} flex gap-2 text-2xl`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
            </svg>Social Info</span>
            <section className="flex gap-6 max-xl:flex-col">
              <span className="flex flex-col">
                <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Twitter</label>
                <span className="relative flex">
                  <input id="twitter" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 pr-4 pl-10 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="twitter.com/@example" required />
                  <span className="absolute p-3">
                    <img src="/twitter.svg" className="h-5 w-5 opacity-50 max-xl:translate-y-1" />
                  </span>
                </span>
              </span>

              <span className="flex flex-col">
                <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>LinkedIn</label>
                <span className="relative flex">
                  <input id="linkedin" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 pr-4 pl-10 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="linkedin.com/@example" required />
                  <span className="absolute p-3">
                    <img src="/linkedin.svg" className="h-5 w-5 opacity-50 xl:-translate-y-1" />
                  </span>
                </span>
              </span>

              <span className="flex flex-col">
                <label htmlFor="name" className={`${jose.className} text-lg translate-x-1`}>Instagram</label>
                <span className="relative flex">
                  <input id="insta" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 pr-4 pl-10 bg-zinc-100 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="instagram.com/@example" required />
                  <span className="absolute p-3">
                    <img src="/instagram.svg" className="h-5 w-5 opacity-50 max-xl:translate-y-1" />
                  </span>
                </span>
              </span>
            </section>
          </div>

          <div className="flex flex-col max-xl:items-center py-3 max-xl:w-full">
            <button onClick={(e) => {

              e.target.disabled = true
              let body = new FormData()
              body.append('name', name ? name : "")
              body.append('company', company ? company : "")
              body.append('designation', designation ? designation : "")
              body.append('about', about ? about : "");
              body.append('cover', cover ? cover : null);
              body.append('profile', file ? file : null)
              body.append('twitter', document.getElementById('twitter').value || "")
              body.append('linkedin', document.getElementById('linkedin').value || "")
              body.append('insta', document.getElementById('insta').value || "")

              // console.log(body);

              popUp("Updating...")

              axios.request({
                method: 'put',
                maxBodyLength: Infinity,
                url: `${process.env.SERVER_URL}/user`,
                headers: {
                  'Authorization': `Bearer ${data?.parallel}`,
                },
                data: body
              }).then(res => {
                // console.log(res)
                e.target.disabled = false
                popUp("Updated Successfully")
                window.location.replace(`/user/${res.data.username}`)
              }).catch(err => {
                console.log(err);
                popUp("Error " + err.message)
                e.target.disabled = false
              })


            }} className={`${jose.className} flex items-center justify-center gap-1 w-[370px] max-w-[90svw] py-2 px-7 text-xl bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -translate-y-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>Update</button>
          </div>

        </div>


        {/* <div className="xl:border-l xl:py-9 xl:pl-9 min-h-screen xl:mr-0 xl:ml-auto flex flex-col gap-10">

                </div> */}
        <div id="imgModal" className="absolute flex flex-col items-center gap-2 bg-white bg-opacity-95 opacity-0 pointer-events-none transition-opacity duration-200 min-h-[95svh] h-full w-full -translate-x-16 max-xl:-translate-x-4 max-w-[2000px]">
          <div className="flex flex-col gap-2 rounded-md bg-zinc-400/40 p-1 mt-10">
            <form onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("images").innerHTML = null
              e.target.children[1].disabled = true

              fetch("/api/unsplash", {
                method: "POST",
                body: JSON.stringify({
                  query: `${e.target.children[0].value}`.toLocaleLowerCase(),
                  // color: "red"
                })
              }).then((res) => res.json()).then(res => {
                res.response.results.map(e => {
                  // console.log(e.urls);
                  // console.log(e.urls.raw);
                  const node = document.createElement("img")
                  node.onclick = ((e) => {
                    fetch(e.target.src).then(res => res.blob()).then(res => {
                      // console.log(res)
                      const fileReader = new FileReader();

                      fileReader.onload = function (event) {
                        const fileContents = event.target.result;
                        setCover(fileContents)
                        // console.log(fileContents);
                      };
                      fileReader.readAsDataURL(res);
                    })
                    // setCover(e.target.src);
                    document.getElementById("imgModal").classList.replace("opacity-100", "opacity-0")
                    document.getElementById("imgModal").classList.add("pointer-events-none")
                  })
                  node.classList.add("h-28", "w-96", "max-lg:w-[90svw]", "bg-slate-300", "object-cover", "cursor-pointer")
                  node.src = e.urls.regular
                  document.getElementById("images").appendChild(node)
                })
                // console.log(res.response.results)
                e.target.children[1].disabled = false
              }).catch(err => {
                console.log(err);
                e.target.children[1].disabled = false
                popUp("Error")
              })

            }} className="flex gap-1">
              <input id="unsplash" className="bg-slate-50 rounded-md h-10 max-lg:w-[70svw] w-[450px] outline-none px-2" type="text" maxLength={20} autoComplete="off" />
              <button className={`${jose.className} bg-zinc-800/90 disabled:opacity-50 px-3 text-white rounded-md`} >Search</button>
            </form>
          </div>
          <div id="images" className="flex gap-3 justify-center flex-wrap p-3"></div>
        </div>

        {!serverCookie ? <Unaccess /> : <></>}

      </m.main>
    </>
  )
}
