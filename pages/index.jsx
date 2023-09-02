import Article from "@/components/Article";
import { jose } from "@/components/Fonts";
import { Refesh } from "@/components/Refesh";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion as m } from "framer-motion"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const getStaticProps = async (ctx) => {

  const data = await fetch(`${process.env.SERVER_URL}/article?limit=5`).then(res => res.json())
  const people = await fetch(`${process.env.SERVER_URL}/user?limit=3`).then(res => res.json())

  return {
    props: {
      data,
      people,
    }
  }
}

export default function Home({ data, people }) {
  const [cookies, setCookie] = useCookies(["data","parallelVortex","parallel"])

  const [latestData, setLatestData] = useState([])
  Refesh(cookies?.parallelVortex, cookies?.parallel)

  useEffect(() => {
    fetch(`${process.env.SERVER_URL}/article/latest`).then(res => res.json()).then(res => {
      setLatestData(res)
    })
  })

  return (
    <>
      <Head>
        <title>Reader - A place for ideas and wisdom</title>
        <meta name="description" content="Explore a world of knowledge and inspiration on our blog app homepage. Discover engaging articles, insightful stories, and a community of passionate writers. Dive into a realm of ideas and creativity today." />
        <meta name="og:description" content="Explore a world of knowledge and inspiration on our blog app homepage. Discover engaging articles, insightful stories, and a community of passionate writers. Dive into a realm of ideas and creativity today." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:image" content="https://blog-app-client-ivory.vercel.app/logo.jpg" />
      </Head>
      <m.main
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className={`flex max-xl:flex-col  xl:items-start min-h-[90svh] px-4 xl:px-16`}>

        {/* Left Hand Side */}
        <div className="flex flex-1 max-xl:w-full flex-col items-start gap-4 py-9 xl:pr-7 ">

          <div className="flex max-xl:flex-col items-start gap-8 max-xl:w-full">

            <form onClick={() => {
              document.querySelector('#input').focus()
            }} onSubmit={(e) => {
              e.preventDefault()
            }} className="flex max-xl:w-full max-xl:px-4 items-center group hover:border-zinc-400 focus-within:border-zinc-400 transition-all duration-300 justify-start rounded-full py-2 px-3 border cursor-text">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-zinc-400 transition-all duration-300 group-hover:scale-110 group-focus-within:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input id="input" type="text" autoComplete="off" placeholder="Search..." className="outline-none px-2 mr-5 w-60 placeholder:text-zinc-400 xl:text-sm text-lg" />
            </form>

            <section className="flex flex-wrap justify-around items-center gap-3 max-xl:w-full">
              {/* <label className={`${jose.className} text-zinc-500`}>My topics:</label> */}
              <Link href={"/articles"} className="max-xl:flex-1 text-center rounded-full bg-zinc-800 px-5 py-3 text-xs max-xl:text-sm transition-all cursor-pointer duration-300 text-white xl:hover:bg-zinc-900  font-medium">New Articles</Link>
              <Link href={"/user"} className="max-xl:flex-1 text-center rounded-full bg-zinc-800 px-5 py-3 text-xs max-xl:text-sm transition-all cursor-pointer duration-300 text-white xl:hover:bg-zinc-900  font-medium">New Users</Link>
            </section>

          </div>

          <section className={`${jose.className} w-full flex items-center justify-between pt-4`}>
            <span className={`text-2xl`}>Articles</span>
            <span className="flex gap-1 items-center rounded-full border px-5 py-3 text-sm transition-all cursor-pointer duration-300 xl:hover:bg-zinc-100 font-medium">Following <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            </span>
          </section>

          {data?.map(e => {
            return (<Article key={e._id} data={e} />)
          })}

        </div>

        {/* Right Hand Side */}
        <div className="xl:border-l xl:py-9 xl:pl-9 min-h-screen xl:mr-0 xl:ml-auto flex flex-col gap-10">

          <div className="flex justify-between gap-1 bg-zinc-100 p-7 rounded-2xl overflow-hidden">
            <span className="flex flex-col items-start gap-3 justify-between">
              <span className="flex flex-col">
                <h2 className={`${jose.className} w-60 font-bold text-xl leading-5`}>Get unlimited access to everything on Reader</h2>
                <p className="text-xs text-zinc-500 ">Plans starting at less than $1 week.</p>
              </span>
              <button className={`${jose.className} mt-2 text-sm rounded-lg p-3 px-6 xl:hover:bg-zinc-300 transition-color duration-200 bg-zinc-200`}>Get Unlimited access</button>
            </span>
            <Image src={"/pad.png"} height={116} width={101} className=" scale-75" />
          </div>

          <div className="flex flex-col gap-4">
            <label className={`${jose.className} text-2xl my-2`}>People you might be interested</label>

            {people ? people.map(e => {
              return (<Link href={`/user/${e.username}`} key={e._id} className="flex items-center justify-between">

                <span className="flex flex-shrink gap-2">
                  <Image loader={() => e.profile} src={e.profile} className="rounded-full object-cover" width={55} height={55} />

                  <section className="flex justify-center flex-col p-1">
                    <span className={`${jose.className} flex text-lg leading-5`}>{e.name}</span>
                    <span className="text-zinc-400 text-xs leading-none">{e.designation} at {e.company || ""}</span>
                  </section>
                </span>

                <span className={` ${jose.className} h-fit flex gap-1 items-center rounded-full border px-5 py-3 text-sm transition-all cursor-pointer duration-300 xl:hover:bg-zinc-100 font-medium leading-3`}>View</span>

              </Link>)
            }) : <></>}
          </div>

          <div className="flex flex-col gap-4">
            <label className={`${jose.className} text-2xl my-2`}>Latest Posts</label>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-3 xl:grid-cols-1">
              {latestData.length > 0 ? latestData.map(e => {
                let date = new Date(e?.createdAt || "2012").toString().split(" ")
                return (<Link key={e._id} href={`/user/${e?.author.username}/${e.permalink}`}><div className="lg:hover:-translate-y-0.5 transition-all duration-200 flex gap-2 xl:max-w-sm ">
                  <div className="relative shrink-0 shadow-md w-36 h-36 rounded-md overflow-hidden bg-zinc-100">
                    <Image className="object-cover flex-1" loader={() => e?.cover} src={e?.cover} fill />
                  </div>
                  <section className="flex flex-col">
                    <span className={`${jose.className} text-xl line-clamp-2 leading-6`}>{e.title}</span>
                    <span className={`${jose.className} text-sm text-zinc-500`}>{`${date[1]} ${date[2]}`}</span>
                    <p className={`line-clamp-2`}>{e.description}</p>
                    <span className="py-1 flex gap-1 text-zinc-600 text-sm font-semibold"><Image loader={() => e.author.profile} src={e.author.profile} className="rounded-full object-cover" width={20} height={20} />{e.author.name}</span>
                  </section>
                </div></Link>)
              }) : <><div className="lg:hover:-translate-y-0.5 transition-all duration-200 flex gap-2 lg:max-w-sm animate-pulse">
                <div className="relative shrink-0 shadow-md w-36 h-36 rounded-md overflow-hidden bg-zinc-100">
                </div>
                <section className="flex flex-col">
                  <span className={`${jose.className} text-xl line-clamp-2 leading-6`}>Fetching Title</span>
                  <p className={`line-clamp-2`}>Fetching Description</p>
                  <span className="py-1 flex gap-1 text-zinc-600 text-sm font-semibold">Fetching Author Name</span>
                </section>
              </div></>}
            </div>
          </div>

        </div>

      </m.main>
    </>
  )
}
