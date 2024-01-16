import { cn } from "@/lib/utils"
import { InputFormProps } from "@/types"

export const CheckboxForm= ({
    id,
    name,
    type,
    checked,
    value,
    label,
    disabled,
    className,
    onChange,
}:InputFormProps) => {
  return (
    <div className="
        flex 
        gap-2
        items-center
    ">
        <input
            // id={id}
            name={name}
            type={type}
            value={value}
            checked={checked}
            className={cn(`
                w-4 
                h-4`,
                className,
            )}
            onChange={onChange}
            disabled={disabled}
        />
        <label>
            {label}
        </label>
    </div>
  )
}