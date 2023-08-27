import { jose } from "./Fonts";

export function popUp(msg) {
    document.getElementById("modelBg").classList.replace("opacity-0", "opacity-100")
    document.getElementById("modelBg").classList.remove("pointer-events-none")
    document.getElementById("modal").classList.remove("scale-0")
    if (msg) document.getElementById("msg").textContent = msg || "Internal Error"
}

export default function Modal() {

    return (
        <div onClick={(e) => {
            // if(e.target.classList.contains("opacity-100")) {
            e.target.classList.replace("opacity-100", "opacity-0")
            e.target.classList.add("pointer-events-none")
            document.getElementById("modal").classList.add("scale-0")
            // }
        }} id="modelBg" className="fixed flex items-center justify-center z-40 min-h-[100svh] min-w-[100svw] bg-black bg-opacity-50 transition-all duration-200 opacity-0 pointer-events-none">
            <div id="modal" className="flex flex-col items-center gap-2 p-2 h-60 lg:w-[500px] w-[90svw] bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.75_0px_10px_15px] transition-all duration-500 scale-0">
                <span className={`${jose.className} relative text-2xl text-center bg-zinc-200 py-2 w-full rounded-lg`}>Alert!</span>
                <div className="p-3 rounded-full w-fit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
                </div>
                <section id="msg" className="text-center px-2 text-zinc-500 font-semibold">{"Waiting for the response"}</section>
            </div>
        </div>
    );
}