import { jose } from "./Fonts";
import { unrevel } from "./UserLog";

export default function Unaccess() {
    return (
        <div className="fixed flex flex-col items-center justify-center gap-2 max-xl:-translate-x-4 xl:-translate-x-16 -translate-y-9 bg-white bg-opacity-40 backdrop-blur-md min-h-screen w-full max-w-[2000px]">
            <span className={`${jose.className} font-semibold text-2xl`}>You are not logged in</span>
            <button onClick={() => {
                unrevel()
            }} className={`${jose.className} text-xl uppercase px-20 leading-6 py-2 rounded-md bg-zinc-800 text-white`}>Login</button>
        </div>
        // <></>
    );
}