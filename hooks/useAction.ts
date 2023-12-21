import { ActionState, FieldError } from "@/lib/createAction";
import { useCallback, useState } from "react";

type Action<input, output> = (data: input) => Promise<ActionState<input, output>>

interface ActionOpsi<output> {
    onSuccess?: (data: output) => void
    onError?: (error: string) => void
    onDone?: () => void
}

export const useAction = <input, output> (
    action: Action<input, output>,
    option: ActionOpsi<output> = {}
) => {
    const [data, setData] = useState<output | undefined>(undefined)
    const [fieldError, setFieldError] = useState<FieldError<input> | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const execute = useCallback( async(input: input) =>{
        setIsLoading(true)

        try {
            const result = await action(input)
            if(!result){
                return
            }

            setFieldError(result.fieldError)

            if(result.error){
                setError(result.error)
                option.onError?.(result.error)
            }

            if(result.data){
                setData(result.data)
                option.onSuccess?.(result.data)
            }

        } finally{
            setIsLoading(false)
            option.onDone?.()
        }
    },[action, option])

    return{
        data, 
        execute, 
        fieldError, 
        error, 
        isLoading,
    }
}