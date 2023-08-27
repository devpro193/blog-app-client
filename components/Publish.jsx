import { jose } from "./Fonts";

export function publishModal(msg) {
    document.getElementById("publishBg").classList.replace("opacity-0", "opacity-100")
    document.getElementById("publishBg").classList.remove("pointer-events-none")
    document.getElementById("publish").classList.remove("scale-0")
}

export function success(title, link, cover, des) {

    document.getElementById('publish').innerHTML = `<span class="relative text-xl text-center bg-lime-200 text-lime-600 py-2 w-full rounded-lg"}>Article Uploaded!</span>
    <a href=${link} class="rounded-md max-w-md overflow-hidden flex gap-5 border border-zinc-300 shadow-md">
    <img class="object-cover h-20 w-1/4 bg-zinc-200" src=${cover} />
    <section class="flex flex-col p-1">
    <label class="text-lg line-clamp-1">${title}</label>
    <p class="text-zinc-600 text-sm line-clamp-2 leading-4">${des}</p>
    </section>
    </a>
    <section class="flex gap-2 items-start text-xl">Share: 
    <a target="_blank" href="https://twitter.com/intent/tweet?text=${encodeURIComponent("Read an article on " + title + " only on Reader")}&url=${encodeURIComponent(window.location.origin + "/" + link)}" class="px-2 py-1"><img src="/twitter.svg" class="h-5 w-5 opacity-50 max-xl:translate-y-1" /></a>
    <a target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.origin + "/" + link)}" class="px-2 py-1"><img src="/linkedin.svg" class="h-5 w-5 opacity-50 xl:-translate-y-1" /></a></section>`
}

export default function Publish() {

    return (
        <div id="publishBg" className="fixed flex items-center justify-center z-30 min-h-[100svh] min-w-[100svw] bg-black bg-opacity-50 transition-all duration-200 opacity-0 pointer-events-none">
            <div id="publish" className={`${jose.className} flex flex-col items-center gap-4 p-3 lg:w-[500px] w-[90svw] bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.75_0px_10px_15px] transition-all duration-500 scale-0`}>
                <span className={`${jose.className} relative text-xl text-center bg-lime-200 py-2 w-full rounded-lg`}>Upload Article
                    <button onClick={(e) => {
                        document.getElementById("publishBg").classList.replace("opacity-100", "opacity-0")
                        document.getElementById("publishBg").classList.add("pointer-events-none")
                        document.getElementById("publish").classList.add("scale-0")
                    }} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 top-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </span>
                <div className="pt-3 flex items-center gap-2">
                    <label className={`${jose.className} text-xl leading-none`}>Tags: </label>
                    <input id="tags" onKeyUp={(e) => {
                        if (e.keyCode < 65 && e.keyCode > 90) e.isDefaultPrevented()
                    }} onPaste={(e) => e.preventDefault()} className={`${jose.className} border-b border-zinc-400 px-1`} type="text" placeholder="e.g. UI, UX, Web" maxLength={40} />
                </div>
                {/* <label className={`${jose.className} text-zinc-400`}>Comma Seperated </label> */}
                <ol className={`${jose.className} grid list-disc`}>
                    <li className="list-item">Title must be long</li>
                    <li className="list-item">Description must be provided</li>
                    <li className="list-item">Article must contain a body</li>
                </ol>
                <button id="publishBtn" onClick={(e) => {
                    e.target.disabled = true
                    document.getElementById("hiddenBtn")?.click()
                }} className={`${jose.className} rounded-full bg-zinc-900 py-1 px-8 text-white transition-all duration-300 disabled:animate-pulse disabled:cursor-not-allowed`}>Publish</button>
            </div>
        </div>
    );
}