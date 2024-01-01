'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

interface ModalProps{
    trigger?: any
    title?: string
    desc?: string
    content?: any
}

const DialogModal = ({
    trigger,
    title,
    desc,
    content
}:ModalProps) => {
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    role="button" 
                    className="
                        flex
                        gap-3
                        px-4
                        py-3
                        items-center
                        hover:bg-neutral-500/20
                    "
                >
                    {trigger}
                </div>
            </DialogTrigger>
            <DialogContent 
                className="sm:max-w-md
            ">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    );
}
 
export default DialogModal;