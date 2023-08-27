import { p2p } from "@/components/Fonts";
import { motion as m } from "framer-motion"
import Head from "next/head";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Page Not Found</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <m.main
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }} className={`relative grid place-items-center place-content-center gap-2 min-h-[85svh] px-4 xl:px-16 py-9`}>
                    <span className={`${p2p.className} text-5xl max-xl:text-4xl`}>404</span>
                    <h1 className={`${p2p.className} text-xl max-xl:text-lg`}>page not found<span className="animate-[pulse_0.7s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]">_</span></h1>
            </m.main>
        </>
    );
}
