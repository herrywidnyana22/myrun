'use client'

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps{
    disabled?: boolean
    className?: string
    children: React.ReactNode
    varian?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
    icon?: any
}

const ButtonForm = ({
    children,
    disabled,
    className,
    varian = "primary",
    icon

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
                : icon
            }
            {children}
                
        </Button>
    );
}
 
export default ButtonForm