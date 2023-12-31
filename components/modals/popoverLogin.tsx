'use client'

import Login from "@/app/(landingPage)/components/Login";
import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";

const PopoverLogin = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="
                        px-4
                        rounded-full
                        border-2
                        border-dashed
                        cursor-pointer
                        border-neutral-700
                        hover:bg-neutral-700
                        hover:border-transparent
                        hover:text-white
                    "
                >
                    <p>Login</p>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="end"
                className="
                    relative 
                    p-4 
                    mt-2
                "
            >
                <div
                    className="
                        pb-3
                        font-medium
                        text-neutral-600
                    "
                >
                    Login to Dashboard
                </div>
                <Separator/>
                <PopoverClose asChild>
                    <Button
                        variant="ghost"
                        className="
                            absolute
                            w-auto
                            h-auto
                            top-2
                            right-2
                            text-rose-600
                        "
                    >
                        <X
                            className="
                                w-4
                                h-4
                            "
                        />
                    </Button>
                </PopoverClose>
                <Login/>
            </PopoverContent>
        </Popover>
    );
}
 
export default PopoverLogin;