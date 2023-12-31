import Logo from "@/components/logo";

import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import Login from "@/app/(landingPage)/components/Login";
import Avatar from "./Avatar";
import PopoverLogin from "./modals/popoverLogin";
import PopoverAvatar from "./modals/PopoverAvatar";

const Navbar = () => {
    const userSession = true
    return ( 
        <nav 
            className="
                fixed
                w-full
                flex
                items-center
                top-0
                h-14
                px-4
                border-b
                shadow-sm
                z-20
                bg-white
            "
        >
            <div 
                className="
                    w-full
                    flex
                    justify-between
                    items-center
                    p-4
                    mx-auto
                    md:max-w-screen-2xl
                "
            >
                <Logo/>
                <div
                    className="
                        flex
                        items-center
                    "
                >
                    <PopoverLogin/>
                    <PopoverAvatar/>
                    
                </div>

            </div>
        </nav> 
    );
}
 
export default Navbar;