'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addPeserta(inputPeserta: any, userKategoriID: string, userPosID: string, isPosFinish: boolean) {
  
    // const { noPeserta, kategori, inputPeserta } = requestData
    // const { inputPeserta, kategori, isPosFinish} = requestData
    // const currentUser: any = await getCurrentUser()
    // const decodedKategoriName = decodeURIComponent(kategori);

    // const posItem = currentUser?.pos.find(
    //     (pos: any) =>
    //     pos.kategori.namaKategori.toLowerCase() === decodedKategoriName.toLowerCase()
    // )

    // const kategoriId = posItem ? posItem.kategori.id : "";
    // const posId = posItem ? posItem.id : ""

    // const userKategoriID = "64929962d0a399795421458f"
    // const userPosID = "64929962d0a3997954214591"

    let newPesertas
    try {
        newPesertas = await Promise.all(inputPeserta.map(async(noPeserta: any) => {
            if(noPeserta[noPeserta.id]){
                const cekNoPeserta =  await db.peserta.findFirst({
                    where: {
                        AND:[{
                            noPeserta: String (noPeserta[noPeserta.id])
                        }, {
                            kategoriId: userKategoriID
                        }]
                    }
                })
    
    
                if(cekNoPeserta){

                    const updatePeserta: any = {
                        pos: {
                            connect: {
                                id: userPosID,
                            }
                        }
                    }

                    if(isPosFinish) {
                        updatePeserta.waktu = noPeserta.time
                    } else {
                        updatePeserta.waktu = "00:00:00:000"
                    }

                    return await db.peserta.update({
                        data: updatePeserta,
                        where:{
                            id:cekNoPeserta.id
                        }
                    })
    
                } else {
                    
                    return await db.peserta.create({
                        data: {
                            noPeserta: noPeserta[noPeserta.id],
                            kategori: {
                                connect: {
                                    id: userKategoriID,
                                }
                            },
                            pos: {
                                connect: {
                                    id: userPosID,
                                }
                            },
                            waktu: noPeserta.time
                        },
                        include:{
                            pos: true,
                            kategori: true
                        }
                    })
                }
            }

        }))

        console.log(newPesertas)
        
    } catch (error) {
        console.log(error)
        return newPesertas = error
    }

    revalidatePath("/dashboard/")
    return{
        data: newPesertas
    }
}