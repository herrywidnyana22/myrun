'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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