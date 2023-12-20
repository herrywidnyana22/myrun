import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
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
                bg-white
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
                        variant={"outline"}
                        asChild
                    >
                        <Link
                            href="/login"                        >
                            Login
                        </Link>
                    </Button>
                </div>

            </div>
        </nav> 
    );
}
 
export default Navbar;