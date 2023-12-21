'use client'

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

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
                `,
                className
            )}
        >
            {children}
        </Button>
    );
}
 
export default ButtonForm