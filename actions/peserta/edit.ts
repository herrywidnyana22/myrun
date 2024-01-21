'use server'

import { db } from "@/lib/db"
import { existData } from "../validate/existData"
import { revalidatePath } from "next/cache"
import { AlertMessage, CustomError, respon } from "@/types"


export async function editPeserta(
    pesertaID: string,
    kategoriID: string, 
    posID: string, 
    data: any
) {

    try {
        const { noPeserta, waktu } = data
        let updateAction

        console.log({data})

        // validate or check if no peserta exist in same pos
        const isSamePos = await existData(noPeserta, "peserta", posID, pesertaID)

        if(isSamePos) {
            return respon(500, 'error', "No peserta sudah ada")
        }


        // check if noPeserta exist in other pos but same kategori?
        const isNoPesertaExist = await db.peserta.findFirst({
            where:{
                AND:[
                    {
                        noPeserta
                    }, {
                        kategoriId: kategoriID
                    }
                ]
            }
        })
        
        // jika ada update no peserta tersebut, isi dengan pos id
        if(isNoPesertaExist){
            const updatePeserta = {
                waktu,
                pos: {
                    connect: {
                        id: posID,
                    }
                }
            }

            updateAction =  await db.peserta.update({
                data: updatePeserta,
                where:{
                    id:isNoPesertaExist.id
                }
            })

            if(!updateAction) return respon(500, 'error', "Gagal memperbarui data...")
            
        // jika tidak ada, maka buat nopeserta baru
        } else {
            updateAction = await db.peserta.update({
                data: {
                    noPeserta
                    
                },
                where:{
                    id: pesertaID
                }
            })

            if(!updateAction) return respon(500, 'error', "Gagal memperbarui data...")
        }

        revalidatePath("/dashboard/")

        return respon(200, 'ok',AlertMessage.addSuccess, updateAction)


    } catch (error) {
        if (error instanceof CustomError) {
            return respon(500, 'error', "Server Error...!")
        } else{
            return error
        }
    }
    
    
}