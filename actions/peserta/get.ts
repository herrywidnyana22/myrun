"use server"

import { db } from "@/lib/db"
import { Role } from '@prisma/client';

export const getPeserta = async(menuName: string) =>{
    const role = Role.PANITIA
    // const namaKategori = formatURL(menuName)
    const namaKategori = "Anak"
    console.log(namaKategori)
    let data
    
    try {
        data = await db.peserta.findMany({
            select:{
                id: true,
                noPeserta: true,
                waktu: true,
                kategori:{
                    select:{
                        id: true,
                        namaKategori: true
                    }
                },
                pos:{
                    select:{
                        id: true,
                        namaPos: true
                    }
                }
            },
            where:{
                kategori:{
                    namaKategori: namaKategori
                },
            }
        })
        return data
    } catch (e) {
        return {
            error: "Kesalahan dalam mendapatkan data peserta"
        }
   }
}
