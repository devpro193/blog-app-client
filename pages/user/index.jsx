import { jose } from "@/components/Fonts";
import { Refesh } from "@/components/Refesh";
import axios from "axios";
import { motion as m } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps(ctx) {
  let userData = null;

  userData = (
    await axios.request({
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.SERVER_URL}/user/new`,
    })
  ).data;

  return {
    props: {
      userData,
    },
  };
}

export default function Draft({ userData }) {

  const [users, setUsers] = useState(userData || []);

  return (
    <>
      <Head>
        <title>New Users</title>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            New Users
          </span>
          <p>All those newly joined users</p>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 py-3">
          {users.length > 0 &&
            users.map((e) => {
              let date = new Date(e?.createdAt || "2012").toString().split(" ")
              return (
                <span
                  key={e._id}
                  id={e._id}
                  className="flex flex-auto shrink-0 flex-col items-center gap-3 p-3 bg-zinc-50 border rounded-md overflow-hidden"
                >
                  <div className="flex flex-col justify-center gap-2">
                    <Link href={`/user/${e.username}`}>
                      <div className="shrink-0 relative grid place-items-center overflow-hidden h-32 w-32 rounded-full bg-slate-200">
                        <Image
                          className="object-cover shadow-md"
                          loader={() => e.profile}
                          src={e.profile}
                          fill
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col w-full items-center">
                      <span className="font-semibold text-xs text-zinc-400">@{e.username}</span>
                      <span className={`${jose.className}`}>{e.name}</span>
                      <span className={`${jose.className} text-xs text-zinc-500`}>Joined on {date[1]} {date[2]}</span>
                    </div>
                    <Link href={`/user/${e.username}`} className={`${jose.className} text-center px-3 py-1 border rounded-full`}>View</Link>
                  </div>
                </span>
              );
            })}
        </div>
      </m.main>
    </>
  );
}
