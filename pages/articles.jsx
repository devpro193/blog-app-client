import Article from "@/components/Article";
import { jose } from "@/components/Fonts";
import { popUp } from "@/components/Modal";
import axios from "axios";
import { motion as m } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps(ctx) {
    let userData = null;

    userData = (
        await axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/article/new`,
        })
    ).data;

    return {
        props: {
            userData,
        },
    };
}

export default function Draft({ userData }) {

    const [articles, setArticles] = useState(userData?.articles || []);
    const [active, setActive] = useState(1);
    const [fetch, setFetch] = useState(false);

    function fetchArticles(page) {
        axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/article/new?page=${page}`,
        }).then(res =>{
            setFetch(false)
            setArticles(res.data?.articles || [])
        }).catch(err =>{
            popUp(err.message)
        })
    }

    return (
        <>
            <Head>
                <title>New Articles</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <m.main
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className={`relative flex flex-col min-h-[90svh] gap-3 px-4 xl:px-16 py-9`}
            >
                <div className="flex justify-between">
                    <section className="flex flex-col">
                        <span
                            id="head"
                            className={`${jose.className} flex gap-2 max-xl:items-start xl:text-3xl text-2xl`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                            Latest Articles
                        </span>
                        <p>Newly written articles by our members</p>
                    </section>
                </div>

                <div className="flex gap-3 py-3 flex-wrap relative">
                    <div className={`${fetch ? "block" : "hidden"} bg-white h-full w-full absolute z-20 bg-opacity-70 animate-pulse`}></div>
                    {articles.length > 0 && articles.map(e => {
                        return (<Article key={e._id} data={e} />)
                    })}
                </div>

                <section className="flex flex-wrap gap-2 max-lg:justify-center">
                    {/* <Link className="py-1 px-3 rounded border lg:hover:bg-zinc-800 lg:hover:text-white h-fit border-gray-400 transition-all duration-200" href={"#"}>1</Link>
                    <span>.</span>
                    <span>.</span>
                    <Link className="py-1 px-3 rounded border lg:hover:bg-zinc-800 lg:hover:text-white h-fit border-gray-400 transition-all duration-200" href={"#"}>6</Link>
                    <Link className="py-1 px-3 rounded border lg:hover:bg-zinc-800 lg:hover:text-white h-fit border-gray-400 transition-all duration-200" href={"#"}>7</Link>
                    <Link className="py-1 px-3 rounded border lg:hover:bg-zinc-800 lg:hover:text-white h-fit border-gray-400 transition-all duration-200" href={"#"}>8</Link>
                    <span>.</span>
                    <span>.</span>
                    <Link className="py-1 px-3 rounded border lg:hover:bg-zinc-800 lg:hover:text-white h-fit border-gray-400 transition-all duration-200" href={"#"}>15</Link> */}

                    {[...Array(userData?.count)].map((x, i) =>
                        <button key={i} onClick={() => {
                            document.getElementById("head").scrollIntoView({ behavior: "smooth" })
                            setActive(i)
                            setFetch(true)
                            fetchArticles(i-1)
                        }} className={`${active == i + 1 ? "bg-zinc-800 text-white" : "lg:hover:bg-zinc-800 lg:hover:text-white"} py-1 px-3 rounded border w-fit h-fit border-gray-400 transition-all duration-200`} href={"#"}>{++i}</button>
                    )}
                </section>
            </m.main>
        </>
    );
}
