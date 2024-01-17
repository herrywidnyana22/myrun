import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";

import { fontHeading, fontText } from "@/public/fonts/fontGlobal";

const LandingPage = () => {
    return ( 
        <div
            className="
                flex
                flex-col
                items-center
                justify-center
            "
        >
            <div
                className={cn(`
                    flex
                    flex-col
                    items-center
                    justify-center`,
                    fontHeading.className
                )}   
            >
                <div
                    className="
                        flex
                        items-center
                        border
                        p-4
                        mb-4
                        shadow-sm
                        rounded-full
                        uppercase
                        text-amber-700
                        bg-amber-100
                    " 
                >
                    <Medal
                        className="
                            w-6
                            h-6
                            mr-2
                        "
                    />
                    No 1 Task Management
                </div>
                <h1
                    className="
                        text-3xl
                        text-center
                        text-neutral-800
                        mb-6
                        md:text-6xl
                    "
                >
                    Help teams move away
                </h1>
                <div 
                    className="
                        w-fit
                        p-2
                        px-4
                        mb-4
                        text-3xl
                        bg-gradient-to-r
                        rounded-md
                        from-fuchsia-600 to-pink-600
                        text-white
                        md:text-6xl
                    "
                >
                    Work Faster
                </div>
            </div>
            <div    
                className={cn(`
                    max-w-xs
                    mx-auto
                    text-center
                    text-sm
                    mt-4
                    text-neutral-400
                    md:max-w-2xl`,
                    fontText.className
                )}
            >
                Collabs with your team, manage projects and reacth new productivity. from high rise to the home office
                and Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet error mollitia vero rerum, architecto repellat.
            </div>
            <Button
                size="lg"
                className="
                    mt-6
                "
            >
                <Link
                  href={"/signup"}  
                >
                    Get TaskMe for free
                </Link>
            </Button>
        </div>
     );
}
 
export default LandingPage;