import { z } from "zod"

export type FieldError<T> = {
    [K in keyof T]? : string[]
}

export type ActionState<input, output> ={
    fieldError?: FieldError<input>
    error?: string | null
    data?: output
}

export const createAction = <input, output> (
    schema: z.Schema<input>,
    handler: (validateData: input) => Promise<ActionState<input, output>>
)=>{
    return async(data: input): Promise<ActionState<input, output>> =>{
        const validateResult = schema.safeParse(data)
        if(!validateResult.success){
            return{
                fieldError: validateResult.error.flatten().fieldErrors as FieldError<input>
            }
        }

        return handler(validateResult.data)
    }
}