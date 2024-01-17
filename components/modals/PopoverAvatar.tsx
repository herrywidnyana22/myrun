'use client'

import Avatar from "../Avatar";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ListTodo, LogOut, UserPlus, X } from "lucide-react";
import DialogModal from "./modals";
import AddKategori from "@/app/(main)/dashboard/(panitia)/components/form-addKategori";
import AddPanitia from "@/app/(main)/dashboard/(panitia)/components/form-addPanitia";
import { adminUser } from "@/app/initUser";

const PopoverAvatar = () => {

    const menuAddKategori = (
        <>
            <ListTodo
                className="w-5 h-5"
            />
            <p>Tambahkan Kategori</p>
        </>
    )
    const menuAddUser = (
        <>
            <UserPlus
                className="w-5 h-5"
            />
            <p>Tambahkan Panitia</p>
        </>
    )

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div role="button">
                    <Avatar/>
                </div>
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="end"
                className="
                    relative 
                    p-0
                    mt-2
                "
            >
                <div
                    className="
                        pb-3
                        font-medium
                        text-neutral-600
                        p-4
                    "
                >
                    <h1 
                        className="
                            font-bold
                            text-sky-600
                        "
                    
                    >
                        {adminUser.role}
                    </h1>
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
                <DialogModal
                    trigger={menuAddKategori}
                    title="Tambah Kategori"
                    desc="Tambahkan kategori baru lomba dan juga pos lomba"
                    content={<AddKategori/>}
                />
                <DialogModal
                    trigger={menuAddUser}
                    title="Tambah Panitia"
                    desc="Tambahkan Panitia yg berjaga di pos lomba"
                    content={<AddPanitia/>}
                />
                <Separator/>
                <div
                    role="button"
                    className="
                        flex
                        gap-3
                        items-center
                        p-4
                        transition
                        hover:text-rose-400
                    "
                >
                    <LogOut
                        className="w-5 h-5"
                    />
                    <p>Keluar</p>
                </div>
            </PopoverContent>
        </Popover>
    );
}
 
export default PopoverAvatar;