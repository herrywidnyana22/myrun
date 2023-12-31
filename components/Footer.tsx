import Logo from "@/components/logo";

import { Button } from "@/components/ui/button";

const Footer = () => {
    return ( 
        <div 
            className="
                fixed
                w-full
                bottom-0
                p-4
                border-t
                bg-slate-100
                z-10
            "
        >
            <div 
                className="
                    w-full
                    flex
                    justify-between
                    items-center
                    mx-auto
                    md:max-w-screen-2xl
                "
            >
                <Logo/>
                <div
                    className="
                        w-full    
                        flex
                        items-center
                        justify-between
                        space-x-4
                        md:block
                        md:w-auto
                    "
                >
                    <Button
                        size={"sm"}
                        variant={"ghost"}
                    >
                        Privacy Policy
                    </Button>
                    <Button
                        size={"sm"}
                        variant={"ghost"}
                    >
                        Term of Service
                    </Button>
                </div>

            </div>
        </div> 
    );
}
 
export default Footer;