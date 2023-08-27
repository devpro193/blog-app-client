import Image from "next/image";
import { jose } from "./Fonts";
import Link from "next/link";

const ArticleCard = ({ img, title, date, des, link }) => {
    date = new Date(date).toString().split(" ")
    return (
        <div className="flex flex-col gap-3 xl:w-[400px] rounded-md p-2">
            <div className="relative rounded-md w-full h-56 overflow-hidden bg-zinc-200">
                {img ? <Link href={link}><Image className="rounded-md shadow object-cover xl:hover:scale-110 transition-all duration-300 cursor-pointer" loader={() => img} src={img} fill /></Link> : <Image className="rounded-md shadow object-cover xl:hover:scale-110 transition-all duration-300" loader={() => "https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODk2OTg4Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"} src={"https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODk2OTg4Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"} fill />}
            </div>
            <div className="flex flex-shrink flex-col gap-2">
                {title ? <span className={`${jose.className} text-xl line-clamp-1 mt-2 px-1 leading-6`}>{title}</span> : <span className={`${jose.className} text-xl line-clamp-1 mt-2 px-1 leading-6`}>Title</span>}
                {date ? <span className={`${jose.className} text-zinc-800/70 px-1 -translate-y-2`}>{date[1] + " " + date[2]}</span> : <span className={`text-zinc-300 font-semibold px-1 -translate-y-2`}>1 January, 2077</span>}
                {des ? <p className="px-1 text-zinc-500 line-clamp-3">{des}</p> : <p className="px-1 text-zinc-500 line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae exercitationem molestias repellat ducimus! Quidem, fuga reiciendis sapiente voluptatum quibusdam repellendus. Ea et ratione possimus odio amet ducimus in officiis nisi!</p>}
                <Link href={link} className="flex-1 rounded-full py-2 border border-zinc-800 text-center transition-all duration-200">Read More</Link>
            </div>
        </div>
    );
}

export default ArticleCard;