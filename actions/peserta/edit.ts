'use server'

import { db } from "@/lib/db"
import { existData } from "../validate/existData"
import { revalidatePath } from "next/cache"


export async function editPeserta(
    pesertaID: string,
    kategoriID: string, 
    posID: string, 
    data: any
) {

    try {
        const { noPeserta, waktu } = data
        let updateAction

        // validate or check if no peserta exist in same pos
        const isSamePos = await existData(noPeserta, "peserta", posID, pesertaID)

        if(isSamePos) {
            throw new Error ("No peserta sudah ada")
        }


        // check is no peserta registrate on other pos?
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

            if(!updateAction) throw new Error("Gagal memperbarui data...")
            
        // jika tidak ada, maka buat nopeserta baru
        } else {
            updateAction = await db.peserta.create({
                data: {
                    noPeserta: noPeserta[noPeserta.id],
                    kategori: {
                        connect: {
                            id: kategoriID,
                        }
                    },
                    pos: {
                        connect: {
                            id: posID,
                        }
                    },
                    waktu: noPeserta.time
                },
                include:{
                    pos: true,
                    kategori: true
                }
            })

             if(!updateAction) throw new Error("Gagal memperbarui data...")
        }

        revalidatePath("/dashboard/")

        return {
            data: updateAction
        }


    } catch (error) {
        throw new Error("Kesalahan sistem...")
    }
    
    
}