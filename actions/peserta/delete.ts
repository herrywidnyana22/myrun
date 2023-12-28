'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function singleDeleted(pesertaID: string) {
    try {
        console.log(pesertaID)

        let deletePeserta

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
        

        return {
            deletePeserta
        }

    } catch (error) {
        return{
            error: error
        }

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
        return {
            error: error
        }
    }

    revalidatePath("/dashboard/")
    
    return{
        data: deletePeserta
    }
}