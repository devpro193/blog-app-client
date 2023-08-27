import Article from "@/components/Article";
import { jose } from "@/components/Fonts";
import { Refesh } from "@/components/Refesh";
import axios from "axios";
import { motion as m } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { useCookies } from "react-cookie";

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
            data: ctx.req.cookies,
            userData,
        },
    };
}

export default function Draft({ data, userData }) {
    let clientCookie = data?.data;
    if (clientCookie) clientCookie = JSON.parse(data?.data);

    Refesh(data?.parallelVortex, data?.parallel);

    const [articles, setArticles] = useState(userData || []);

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
                <section className="flex flex-col">
                    <span
                        className={`${jose.className} flex gap-2 max-xl:items-start xl:text-3xl text-2xl`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                        Latest Articles
                    </span>
                    <p>Newly written articles by our members</p>
                </section>

                <div className="flex gap-3 py-3 flex-wrap">
                    {articles.length > 0 && articles.map(e => {
                        return (<Article key={e._id} data={e} />)
                    })}
                </div>
            </m.main>
        </>
    );
}
