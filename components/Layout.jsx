import { poppins } from "./Fonts";
import Footer from "./Footer";
import Header from "./Header";
import Modal from "./Modal";
import Publish from "./Publish";
import UserLog from "./UserLog";
import { AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
    return (
        <div className={`${poppins.className}`}>
            <Modal />
            <UserLog />
            <Publish />
            <Header />
            <AnimatePresence mode="wait" initial={false}>
                <div className="max-w-[2000px] mx-auto">
                    {children}
                </div>
            </AnimatePresence>
            <Footer />
        </div>
    );
}