'use client'

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import ErrorMsg from "./validateMsg"

interface InputTableProps{
    id: string
    label?: string
    type?: string
    defaultValue?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    validateMsg?: Record<string, string[] | undefined>
    className?: string
    onBlur?: () => void
}

const InputTable = forwardRef<HTMLInputElement, InputTableProps>(({
    id, 
    label, 
    type, 
    defaultValue = "",
    placeholder, 
    required, 
    disabled, 
    validateMsg, 
    className, 
    onBlur
}, ref) => {
    const { pending } = useFormStatus()

    return (

        <div 
            className="
                space-y-2
            "
        >
            <div    
                className="
                    space-y-1
                "
            >
            {
                label 
                ?   <Label
                        htmlFor={id}
                        className="
                            text-xs
                            font-semibold
                            text-neutral-700
                        "
                    >
                        {label}
                    </Label>
                :   null

            }
                <Input
                    id={id}
                    name={id}
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    ref={ref}
                    required={required}
                    disabled={pending || disabled}
                    className={cn(`
                        h-7 
                        px-2
                        py-1
                        text-sm`,
                        className
                    )}
                    aria-describedby={`${id}-error`}
                />
            </div>
            <ErrorMsg
                id={id}
                error={validateMsg}
            />
        </div>
    )
})

InputTable.displayName = "InputTable"

export default InputTable