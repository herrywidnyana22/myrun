'use server'

import { db } from "@/lib/db"
import { CustomError, respon } from "@/types"
import { revalidatePath } from "next/cache"

export async function singleDeleted(pesertaID: string) {
    let deletePeserta
    try {

        const cekNoPeserta =  await db.peserta.findFirst({
            where: {
                id: pesertaID
            }
        })

        const cekPos = await db.pos.findFirst({
            where:{
                pesertaId:{
                    hasSome: [pesertaID]
                }
            }
        })

        if(cekNoPeserta && cekNoPeserta.posId.length === 1){
            deletePeserta = await db.peserta.delete({
                where:{
                    id: pesertaID
                }
            })
        }

         if(cekNoPeserta && cekNoPeserta.posId.length > 1){
            deletePeserta = await db.peserta.update({
                data:{
                    pos:{
                        disconnect:{
                            id: cekPos?.id
                        }
                    }
                },
                where:{
                    id: pesertaID
                },
            })
        }
        


    } catch (error) {
        return{
            deletePeserta: error
        }

    }

    revalidatePath("/dashboard/")
    
    return{
        data: deletePeserta
    }
}

export async function checkedDelete(data: any, posID: string){
    let deletePeserta
    
    try {
        for (const pesertaId of data){

            const cekNoPeserta =  await db.peserta.findFirst({
                where: {
                    id: pesertaId
                }
            })

            if(cekNoPeserta && cekNoPeserta.posId.length === 1){
                deletePeserta = await db.peserta.delete({
                    where:{
                        id: pesertaId
                    }
                })
            }

            if(cekNoPeserta && cekNoPeserta.posId.length > 1){
                deletePeserta = await db.peserta.update({
                    data:{
                        pos:{
                            disconnect:{
                                id: posID
                            }
                        }
                    },
                    where:{
                        id: pesertaId
                    },
                })
            }
        }

        

    } catch (error) {
        if (error instanceof CustomError) {
            return respon(500, 'error', "Server Error...!")
        } else{
            return error
        }
    }

    revalidatePath("/dashboard/")
    
    return respon(200, 'ok', "Data didapatkan...!", deletePeserta)
}
