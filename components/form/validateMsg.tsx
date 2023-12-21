import { XCircle } from "lucide-react"

interface ErrorFormProps {
    id: string
    error?: Record<string, string[] | undefined>
}

const ValidateMsg = ({id, error}: ErrorFormProps) => {
    if(!error) return null

    return(
        <div
            id={`${id}-error`}
            aria-live="polite"
            className="
                mt-2
                text-xs
                text-rose-500
            "
        >
            {error?.[id]?.map((errorItem: string, i: number) => (
                <div
                    key={i}
                    className="
                        flex
                        items-center
                        p-2
                        font-medium
                        border
                        rounded-sm
                        border-rose-500
                        bg-rose-500/10
                    "
                >
                    <XCircle
                        className="
                           w-4
                           h-4
                           mr-2 
                        "
                    />
                    { errorItem }
                </div>
            ))}

        </div>
    )
}
 
export default ValidateMsg;