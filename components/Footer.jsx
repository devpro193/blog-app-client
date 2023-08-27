import { jose } from "./Fonts";

export default function Footer() {
    return (
        <div className="w-full px-3 py-2 text-zinc-600">
            <span className={`${jose.className} text-sm`}>Copyright © 2023 Reader</span>
        </div>
    );
}