import { Josefin_Sans, Montserrat, Oswald, Press_Start_2P } from 'next/font/google'

export const oswald = Oswald({
    subsets: ['latin'],
    weight: ['700'],
    display: 'block',
})

export const poppins = Montserrat({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','700'],
    display: 'swap',
})

// export const poppins = Poppins({
//     subsets: ['latin'],
//     weight: ['100','200','300','400','500','700'],
//     display: 'swap',
// })

export const jose = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'block',
})

export const p2p = Press_Start_2P({
    subsets: ['greek'],
    weight: ['400'],
    display: 'block',
})