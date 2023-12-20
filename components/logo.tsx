import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { fontHeading } from "@/public/fonts/fontGlobal";
import { siteConfig } from "@/config/site";
const Logo = () => {
    return ( 
        <Link
            href='/'
        >
            <div
                className="
                    hidden
                    gap-x-2
                    items-center
                    transition
                    hover:opacity-50
                    md:flex
                "
            >
                <Image
                    alt="Logo"
                    src="/logo.png"
                    height="30"
                    width="30"
                />
                <p 
                    className={cn(`
                        pt-1
                        text-lg
                        text-neutral-700`,
                        fontHeading.className
                    )}
                >
                    {siteConfig.title}
                </p>
            </div>
        </Link>
     );
}
 
export default Logo;