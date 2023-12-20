import localFont from "next/font/local"
import { Poppins } from "next/font/google";

export const fontHeading = localFont({
    src: "../../public/fonts/font.woff2"
})

export const fontText = Poppins({
    subsets: ["latin"],
    weight:[
        "100",
        "200",
        "300",
        "400", 
        "500", 
        "600", 
        "700", 
        "800", 
        "900"
    ]
})