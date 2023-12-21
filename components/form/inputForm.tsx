import { cn } from "@/lib/utils";

interface InputFormProps{
    id: string
    disabled?: boolean
    placeholder?: string
    type?: "text" | "password" | "number"
    label?: string
}

const InputForm = ({
    id,
    type,
    label,
    placeholder,
    disabled
}: InputFormProps) => {
    return (
        <div
            className="
                relative
                w-fulll
                text-neutral-700
            "
        >
            <input
                id={id}
                name={id}
                type={type}
                disabled={disabled}
                placeholder={placeholder ? placeholder : "  "}
                className={cn(`
                    w-full
                    peer
                    p-2
                    text-sm
                    px-3
                    pt-3
                    font-light
                    rounded-md
                    border-2
                    outline-none
                    transition
                    bg-white
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    focus:text-sm`,
                )}
            />
            <label className={cn(`
                absolute
                top-2.5
                left-2.5
                px-1
                text-sm
                -translate-y-5
                origin-[0]
                z-10
                duration-150
                transform
                bg-white
                pointer-events-none
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-5`,  
                
            )}>
                { label }
            </label>
        </div>

    );
}
 
export default InputForm;