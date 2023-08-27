import Image from "next/image";
import { jose } from "./Fonts";
import Link from "next/link";
import BadWordsFilter from "bad-words";

export default function Article({ data }) {
  let date = new Date(data?.createdAt || "2012").toString().split(" ")
  const filter = new BadWordsFilter();
  filter.addWords("gay")
  return (
    <div className="border-t border-zinc-300 flex flex-col gap-4 py-5 w-full">
      <div className="relative flex justify-between items-center">
        <section className="flex gap-2">
          {data?.author.profile ? <Link href={`/user/${data?.author.username}`}><Image loader={() => data.author.profile} src={data.author.profile} className="rounded-full object-cover" width={55} height={55} /></Link> : <span className="h-14 w-14 animate-pulse bg-zinc-100 rounded-full"></span>}
          <section className="flex justify-center flex-col p-1">
            {data?.author.name ? <span className={`${jose.className} flex items-center text-lg leading-[0px]`}> <Link href={`/user/${data?.author.username}`}>{data.author.name}</Link> ·<label className="px-2 text-sm text-zinc-400">{date[1] + ' ' + date[2]}</label></span> : <span className="bg-zinc-100 animate-pulse w-20 h-6 rounded-md"></span>}
            <section className="flex gap-1">
              {data?.author.designation ? <span className="text-zinc-400 text-sm">{data.author.designation || NaN}</span> : <span className="bg-zinc-100 animate-pulse w-40 h-6 rounded-md"></span>}
              {data?.author.company ? <span className="text-zinc-400 text-sm">at {data.author.company || NaN}</span> : <></>}
            </section>
          </section>
        </section>

        <span onClick={(e) => {
          e.currentTarget.parentElement.children[2].classList.replace('opacity-0', 'opacity-100')
          e.currentTarget.parentElement.children[2].classList.remove('pointer-events-none')
        }} className="p-0.5 rounded-full opacity-70 h-fit transition-all duration-200 xl:hover:opacity-100 xl:hover:bg-zinc-200 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </span>

        <div onMouseLeave={(e) => {
          e.target.classList.replace('opacity-100', 'opacity-0')
          e.target.classList.add('pointer-events-none')
        }} className="absolute z-30 right-7 top-10 min-h-[5rem] w-40 bg-white rounded-md border transiot duration-200 pointer-events-none opacity-0 flex flex-col p-1 gap-1">
          <button onClick={(e) => {
            e.currentTarget.parentElement.classList.replace('opacity-100', 'opacity-0')
            e.currentTarget.parentElement.classList.add('pointer-events-none')
          }} className="flex flex-1 justify-center p-1 rounded-md bg-zinc-100 gap-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg> Share</button>
          <button onClick={(e) => {
            e.currentTarget.parentElement.classList.replace('opacity-100', 'opacity-0')
            e.currentTarget.parentElement.classList.add('pointer-events-none')
          }} className="flex flex-1 justify-center p-1 rounded-md bg-zinc-100 gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg> Report</button>
        </div>
      </div>

      <section className="flex max-xl:flex-col-reverse gap-3 items-start justify-between">
        <div className="flex flex-col py-3 gap-2 w-full xl:h-44 h-60">
          <Link href={`/user/${data?.author.username}/${data?.permalink}`} className="flex flex-1 flex-col gap-2 h-full">
            {data?.title ? <h3 className={`${jose.className} text-2xl leading-7`}>{filter.clean(data.title)}</h3> : <span className="h-10 w-96 animate-pulse bg-zinc-100 rounded-md"></span>}
            {data?.description ? <p className="text-zinc-600 line-clamp-3">{filter.clean(data.description)}</p> : <><span className="h-8 w-full animate-pulse bg-zinc-100 rounded-md"></span><span className="h-8 w-full animate-pulse bg-zinc-100 rounded-md"></span></>}
          </Link>

          <div className="flex justify-between items-center pt-6">
            <section className="flex gap-3">
              {data?.tags ? <><span className="rounded-full bg-zinc-100 px-5 py-3 text-xs max-xl:text-sm transition-all cursor-pointer duration-300 xl:hover:bg-zinc-200 xl:hover:text-zinc-400 text-zinc-400 font-medium">{data?.tags[0]}</span><span className="rounded-full bg-zinc-100 px-5 py-3 text-xs max-xl:text-sm transition-all cursor-pointer duration-300 xl:hover:bg-zinc-200 xl:hover:text-zinc-400 text-zinc-400 font-medium">3 min read</span></> : <><span className="rounded-full bg-zinc-100 px-5 py-3 w-28 animate-pulse"></span><span className="rounded-full bg-zinc-100 px-5 py-3 w-28 h-10 animate-pulse"></span></>}
            </section>
          </div>
        </div>


        {data?.cover ? <div className="flex-shrink-0 relative xl:h-48 h-60 w-80 rounded-lg max-xl:w-full overflow-hidden my-auto"><Link href={`/user/${data?.author.username}/${data?.permalink}`}><Image loader={() => data.cover} src={data.cover} fill className="rounded-lg xl:hover:scale-110 transition-all duration-200 cursor-pointer object-cover max-xl:w-full" /></Link></div> : <div className="h-40 w-72 max-xl:w-full max-xl:h-80 bg-zinc-100 rounded-lg animate-pulse"></div>}

      </section>

    </div>
  );
}