'use client'

import { getPeserta } from "@/actions/peserta/get";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserKategori } from "@/types";
import { usePathname, useRouter } from "next/navigation";

interface MenuDashboardProps{
    userMenu: UserKategori[] | any
}

const MenuDashboard = ({userMenu}: MenuDashboardProps) => {
    const router = useRouter()
    const pathName = usePathname()
    
    const onClickNavbar = async(href: string) =>{
        router.push(href)
    }

    return (
        <div
            className="
                flex
                gap-4
                mx-auto
                items-center
                font-bold
                text-neutral-600
            "
        >
            {
                userMenu && userMenu.map((item: any, i:number) =>(
                    <Button
                        key={i}
                        variant="outline"
                        onClick={() => onClickNavbar(item.href)}
                        className={cn(`
                            rounded-full
                            border-2
                            border-neutral-400
                            bg-transparent
                            hover:bg-gray-500/20`,
                            pathName === item.href &&
                            `text-white
                            border-neutral-600
                            bg-gray-500`
                        )}
                    >
                        <p>{item.label}</p>
                    </Button>
                ))
            }
        </div>
    );
}
 
export default MenuDashboard;