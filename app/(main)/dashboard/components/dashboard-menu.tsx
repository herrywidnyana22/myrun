'use client'

import { getPeserta } from "@/actions/peserta/get";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserKategori } from "@/types";
import { usePathname, useRouter } from "next/navigation";

interface MenuDashboardProps{
    userMenu: UserKategori[] | any,
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
                menu-wrapper
                fixed
                w-full
                h-20
                left-0
                top-14
                z-20
                py-6
                bg-slate-100
            "
        >
            <div 
                className="
                    relative
                    flex
                    items-center
                    gap-4
                    px-8
                    py-1
                    mx-auto
                    md:max-w-screen-2xl
                "
            >
                <div
                    className="
                        w-auto
                        flex
                        gap-4
                        p-1
                        font-semibold
                    "
                >
                    {
                        userMenu && userMenu.map((item: any, i:number) =>(
                            <div
                                role="button"
                                key={i}
                                onClick={() => onClickNavbar(item.href)}
                                className={cn(`
                                    p-1
                                    px-8
                                    rounded-full
                                    border-2
                                    border-neutral-400
                                    bg-transparent
                                    hover:bg-gray-500/20`,
                                    pathName === item.href &&
                                    `shadow-md
                                    text-neutral-200
                                    bg-gray-500`
                                )}
                            >
                                <p>{item.label}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
}
 
export default MenuDashboard;