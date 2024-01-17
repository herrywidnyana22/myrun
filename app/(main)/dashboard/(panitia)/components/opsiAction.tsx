'use client'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";

interface OpsiActionProps{
    onCancel?: () => void
    deleteAction?: () => void
    editAction?: () => void
    editModeOn?: () => void
    condition?: boolean
    disabled?: boolean
}

const OpsiAction = ({
    condition,
    onCancel,
    editModeOn,
    deleteAction,
    disabled
}: OpsiActionProps) => {
    return (
        <>
            {
                !condition
                ? (
                    <DropdownMenu>
                        <div className="text-center">
                            <span className="sr-only">Open menu</span>
                            <DropdownMenuTrigger asChild>
                                <Button
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                >
                                <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={editModeOn} 
                                className="
                                    space-x-1
                                    cursor-pointer
                                    text-neutral-600
                                    hover:text-white
                                    hover:bg-orange-300
                                "
                            >
                                <Pencil
                                className="
                                    w-3
                                    h-3
                                "
                                />
                                <p>Ubah peserta ini</p>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={deleteAction}
                                className="
                                space-x-1
                                cursor-pointer
                                text-neutral-600
                                hover:text-white
                                hover:bg-rose-400
                            "
                            >
                                <Trash2
                                className="
                                    w-3
                                    h-3
                                "
                                />
                                <p>Delete peserta ini</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  )
                : (
                    <div className="space-x-2">
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={disabled} 
                            className="
                                h-8 
                                w-8 
                                p-0 
                                hover:bg-green-400 
                                hover:text-white
                            "
                        >
                        <Check 
                            className="h-4 w-4" 
                        />
                        </Button>
                        <Button
                            onClick={onCancel} 
                            variant="outline" 
                            className="
                                h-8 
                                w-8 
                                p-0 
                                hover:bg-rose-400 
                                hover:text-white
                            "
                        >
                        <X className="h-4 w-4" />
                        </Button>
                    </div>
                )
            }
            
        
        </>
    );
}
 
export default OpsiAction;