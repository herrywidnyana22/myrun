'use server'

import { db } from "@/lib/db"
import { existData } from "../validate/existData"
import { revalidatePath } from "next/cache"
import { AlertMessage, CustomError, respon } from "@/types"


export async function editUser(
    dataID: string,
    data: any
) {
    try{
        const {namaPanitia, username, pos} = data
        console.log({namaPanitia})
        console.log({username})
        console.log({pos})

        return{
            code: 200,
            data: pos,
            msg: AlertMessage.editSuccess
        }

    } catch (error) {
        if (error instanceof CustomError) {
            return respon(500, 'error', "Server Error...!")
        } else{
            return error
        }
    }
    
    
}