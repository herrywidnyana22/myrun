'use client'

import Avatar from "../Avatar";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";

const PopoverAvatar = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div role="button">
                    <Avatar/>
                </div>
                {/*  */}
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
                <div>
                    modal content
                </div>
            </PopoverContent>
        </Popover>
    );
}
 
export default PopoverAvatar;