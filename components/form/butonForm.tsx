'use client'

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps{
    disabled?: boolean
    className?: string
    varian?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
    children: React.ReactNode
}

const ButtonForm = ({
    children,
    disabled,
    className,
    varian = "primary"
}: ButtonProps) => {
    const { pending } = useFormStatus()
    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            size="sm"
            variant={varian}
            className={cn(`
                flex items-center gap-2`,
                className
            )}
            aria-disabled={pending}
        >
            {
                pending
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                : children
            }
                
        </Button>
    );
}
 
export default ButtonForm