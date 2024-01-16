import { cn } from "@/lib/utils";
import { InputFormProps } from "@/types";
import { forwardRef } from "react";



const InputForm = (forwardRef<HTMLInputElement, InputFormProps>(({
    id,
    name,
    value,
    type,
    label,
    placeholder,
    disabled,
    isError,
    isWaktu,
    readOnly,
    className, 
    validateMsg,
    secondValidateMsg,
    onChange,
}, ref) => {

    

    return (
        <div
            className="
                relative
                flex
                flex-col
            "
        >
            <div
                className="
                    relative
                    w-fulll
                    text-neutral-700
                "
            >
                {/* {JSON.stringify(readOnly ? "true" : "false")} */}
                <input
                    ref={ref}
                    id={id}
                    name={name}
                    value={value}
                    type={type}
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={placeholder ? placeholder : "  "}
                    onChange={onChange}
                    className={cn(`
                        appearance-none
                        w-full
                        peer
                        p-2
                        text-sm
                        px-3
                        pt-2
                        font-light
                        rounded-md
                        border-2
                        outline-none
                        transition
                        bg-white
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        focus:text-sm`,
                        className,
                        disabled && "opacity-80 cursor-not-allowed",
                        readOnly 
                        ? "ring-0 shadow-none border-transparent bg-transparent"
                        : "shadow-sm",
                        isError && (validateMsg && validateMsg[id]
                        ||  secondValidateMsg && secondValidateMsg[id])
                        && "border-rose-400  ring-rose-300"
                        
                    )}
                />
                {/* {   !readOnly &&( */}
                    <label className={cn(`
                        absolute
                        top-2.5
                        left-2.5
                        px-1
                        text-sm
                        origin-[0]
                        z-10
                        duration-150
                        transform`,
                        !readOnly 
                        && `
                            -translate-y-5
                            bg-white
                            pointer-events-none
                            peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75
                            peer-focus:-translate-y-5
                        `,
                        isWaktu && !readOnly && "left-1 peer-focus:-translate-y-5",
                        isError && (validateMsg && validateMsg[id]
                        ||  secondValidateMsg && secondValidateMsg[id])
                        && "text-rose-400",
                        className  
                    )}>
                        { label }
                    </label>
            </div>
            <div className="flex flex-col mt-1">
                <span className="text-xs text-rose-400">
                {  
                    validateMsg && 
                    Object.keys(validateMsg).length > 0 && 
                    validateMsg[id] 
                }
                </span>
                    
                <span className="text-xs text-rose-400">
                {
                    secondValidateMsg && 
                    Object.keys(secondValidateMsg).length > 0 
                    && secondValidateMsg[id] 
                }
                
                </span>

            </div>
        </div>

    );
}))

InputForm.displayName = "InputForm"

export default InputForm;