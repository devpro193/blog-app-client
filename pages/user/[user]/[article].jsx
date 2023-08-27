import { jose, p2p, poppins } from "@/components/Fonts";
import { popUp } from "@/components/Modal";
import { Refesh } from "@/components/Refesh";
import { unrevel } from "@/components/UserLog";
import axios from "axios";
import BadWordsFilter from "bad-words";
import { motion as m } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export async function getServerSideProps({ params, req }) {

  const data = await fetch(`${process.env.SERVER_URL}/article/${params.user}/${encodeURIComponent(params.article)}`).then(res => res.json())
  // let data = params.user

  return {
    props: {
      data,
      cookies: req.cookies,
      user: params.user
    }
  }
}

export default function Articles({ data, cookies, user }) {
  let clientCookie = cookies?.data
  let serverCookie = cookies?.parallelVortex
  if (clientCookie) clientCookie = JSON.parse(cookies?.data)

  Refesh(cookies?.parallelVortex, cookies?.parallel)

  useEffect(() => {
    if (data) document.getElementById("container").innerHTML = data?.body.join("")
    setUrl(window.location.href)
  }, [])

  let date = new Date(data?.createdAt || "2012").toString().split(" ")

  const [title, setTitle] = useState(data?.title)
  const [comments, setComments] = useState(data?.comments || [])
  const [likes, setLikes] = useState(data?.likes?.length || 0)
  const [liked, setLiked] = useState(data?.likes?.includes(clientCookie?.username))
  const [following, setFollowing] = useState(data?.author?.followers?.includes(clientCookie?.username))
  const [url, setUrl] = useState(null)

  const filter = new BadWordsFilter();
  filter.addWords("gay")

  function commentIt(review, article) {
    document.getElementById("commentor").disabled = true
    document.getElementById("commentInput").disabled = true

    axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.SERVER_URL}/article/comment`,
      headers: {
        'Authorization': `Bearer ${cookies?.parallel}`,
      },
      data: {
        review, article
      }
    }).then(res => {
      setComments([...comments, res.data])
      document.getElementById("commentor").disabled = false
      document.getElementById("commentInput").value = null
      document.getElementById("commentInput").disabled = false
    }).catch(err => {
      popUp(err.message + " " + err.response.data.message)
      document.getElementById("commentor").disabled = false
      document.getElementById("commentInput").disabled = false
    })
  }

  function like() {
    if (!data?._id) return null

    if (!clientCookie) return unrevel()

    document.getElementById('like').disabled = true

    axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.SERVER_URL}/article/like/${data?._id}`,
      headers: {
        'Authorization': `Bearer ${cookies?.parallel}`,
      }
    }).then(res => {
      setLiked(!liked)
      res.data.state ? setLikes(likes + 1) : setLikes(likes - 1)
      document.getElementById('like').disabled = false
    }).catch(err => {
      popUp(err.message + " " + err?.response?.data.message)
      document.getElementById('like').disabled = false
    })
  }

  function follow() {
    if (!clientCookie) return unrevel()
    document.getElementById("follow").disabled = true

    axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.SERVER_URL}/user/follow/${user}`,
      headers: {
        'Authorization': `Bearer ${cookies?.parallel}`,
      }
    }).then(res => {
      setFollowing(res.data?.state)
      document.getElementById("follow").disabled = false
    }).catch(err => {
      popUp(err.message + " " + err.response.data.message)
      document.getElementById("follow").disabled = false
    })
  }

  return data ? (
    <>
      <Head>
        <title>{filter.clean(title)}- Reader</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={data.description} />
        <meta property="og:title" content={filter.clean(data.title)} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.cover} />
        <meta property="og:url" content={`/user/${user}/${data.parmalink}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <m.main
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className={`flex justify-center min-h-[90svh] px-4 xl:px-16`}>
        <div className="flex flex-1 max-xl:w-full max-w-3xl flex-col items-center gap-4 py-5">
          <section className="flex flex-col py-2 gap-2 w-full">
            <span className="flex justify-between overflow-hidden">
              <h1 className={`${jose.className} text-4xl max-xl:text-3xl`}>{filter.clean(data?.title) || ""}</h1>
            </span>

            <span className="flex w-full justify-between items-center">
              <section className="flex items-center gap-2">
                <span className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-200">
                  <Link href={`/user/${user}`}>
                    <Image className="object-cover border-0" loader={() => data?.author.profile} src={data?.author.profile} fill />
                  </Link>
                </span>
                <section className="flex flex-col">
                  <span className={`${jose.className} text-lg flex gap-2`}><Link href={`/user/${user}`}>{data?.author.name}</Link> <button onClick={() => {
                    follow()
                  }} id="follow" className={`${following ? "text-opacity-70 text-zinc-600" : "text-blue-500"} ${clientCookie?.username == user ? "hidden" : "block"} text-base disabled:cursor-pointer disabled:opacity-30`}>• {following ? "Following" : "Follow"}</button></span>
                  <span className={`text-zinc-400 text-sm`} >{`${date[1]} ${date[2]}, ${date[3]}`}</span>
                </section>
              </section>
              {/* <section className="flex items-center gap-3 px-2"> */}
              <button className={`${jose.className} text-sm xl:py-1 py-0.5 px-3 h-fit rounded-full border text-zinc-700 border-zinc-500 xl:hover:scale-105 transition-all duration-200`}>{data?.tags[0]}</button>
              {/* </section> */}
            </span>

          </section>
          <div className="relative xl:h-[400px] h-60 rounded-lg w-full bg-slate-300 overflow-hidden">
            <Image className="object-cover" loader={() => data?.cover} src={data?.cover} fill />
          </div>
          <div className="flex justify-between px-2 py-1 w-full">
            <form onSubmit={(e) => {
              e.preventDefault()
              like()
            }} className="flex gap-2 items-center">
              <button className="disabled:opacity-30" id="like" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 lg:hover:scale-110 transition-colors duration-300 cursor-pointer ${liked ? "fill-red-500 stroke-red-500" : "stroke-zinc-700"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
              <span className={`${jose.className} leading-none text-zinc-500`}>{likes}</span>
            </form>
            <span className="flex gap-3 items-center">
              <Link target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Read an article on " + title + " only on Reader")}&url=${encodeURIComponent(url)}`}><img src="/twitter.svg" class="h-6 w-6 opacity-50 " /></Link>
              <Link target="_blank" href={`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`}><img src="/linkedin.svg" class="h-6 w-6 opacity-50 -translate-y-1" /></Link>
            </span>
          </div>
          <div id="container" className={`${poppins.className} flex flex-col w-full gap-3 px-2 outline-none`}>
          </div>
          <hr className="w-40" />
          <div className="flex flex-col w-full gap-3 px-2">
            <span className={`${jose.className} flex gap-2 items-center text-2xl`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>Comments</span>
            <div className="flex flex-col gap-5 my-3">
              {comments.length != 0 ? comments.map(e => {
                let commentDate = new Date(e.createdAt || "2012").toString().split(" ")
                return (<section key={e.createdAt} className="flex gap-2">
                  <Link href={`/user/${e.user.username}`} className="relative shrink-0 rounded-full h-12 w-12 bg-slate-200 overflow-hidden">
                    <Image loader={() => e.user?.profile || "/unknown.webp"} src={e.user?.profile || "/unknown.webp"} className="object-cover" fill />
                  </Link>
                  <section className="flex flex-col p-1 gap-1">
                    <Link href={`/user/${e.user.username}`} className={`${jose.className} leading-none text-lg w-fit`}>{e.user.name} • <span className="text-sm text-zinc-500">{`${commentDate[1]} ${commentDate[2]} at ${commentDate[4]}`}</span></Link>
                    <p className="text-zinc-800">{filter.clean(e.review)}</p>
                  </section>
                </section>)
              }) : <section className="w-full h-32 flex items-center justify-center">
                <span className="bg-zinc-200 rounded-md text-zinc-700 font-semibold px-3 py-1">No Comments</span></section>}
            </div>

            {serverCookie ? <form onSubmit={(e) => {
              e.preventDefault()
              commentIt(e.target.children[0].value, data?._id)
            }} className="flex gap-2">
              <input autoComplete="off" id="commentInput" placeholder="Write your reviews..." className={`${poppins.className} bg-zinc-100 rounded-md flex-1 px-4 py-2 outline-none text-lg" type="text`} maxLength={200} />
              <button id="commentor" className={`${jose.className} px-5 py-1 rounded-md bg-zinc-900 disabled:opacity-40 text-white`}>Send</button>
            </form> : <div className="flex gap-2">
              <input autoComplete="off" placeholder="Login for writing a review" className={`${poppins.className} disabled:opacity-50 bg-zinc-100 rounded-md flex-1 px-4 py-2 outline-none text-lg" type="text`} maxLength={200} disabled />
              <button onClick={() => {
                unrevel()
              }} className={`${jose.className} px-5 py-1 rounded-md bg-zinc-900 disabled:opacity-40 text-white`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg></button>
            </div>}

          </div>
        </div>
      </m.main>
    </>
  ) : (<>
    <Head>
      <title>Article Not Found</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main className={`grid place-content-center place-items-center gap-2 min-h-[85svh] px-4 xl:px-16`}>
      <span className={`${p2p.className} text-5xl max-xl:text-4xl`}>404</span>
      <h1 className={`${p2p.className} text-xl max-xl:lg`}>article not found<span className="animate-[pulse_0.7s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]">_</span></h1>
    </main>
  </>)
}