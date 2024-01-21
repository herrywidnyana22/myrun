'use server'

import { adminUser, panitiaUser } from "@/app/initUser"
import { db } from "@/lib/db"
import { CustomError, respon } from "@/types"

export async function getKategoriUser(){
    // const currentUser = await getCurrentUser()
    // if (currentUser && currentUser?.role !== Role.PANITIA) return new NextResponse('Unauthorized', { status: 401})
    // const currentUser = adminUser.id
    const currentUser = panitiaUser.id

    const menuPanitia = await db.panitia.findMany({
        select:{
            id: true,
            namaPanitia: true,
            pos:{
                select:{
                    id: true,
                    namaPos: true,
                    kategori:{
                        select:{
                            id: true,
                            namaKategori: true
                        }
                    }
                }
            }
        },

        where:{
            // id: currentUser?.id
            id: currentUser
        }

    })

    return respon(200, 'ok', "Berhasil mendapatkan data...", menuPanitia)
}

export async function getAllKategori(){
    try {
        const kategoriData = await db.kategori.findMany({
            select:{
                id:true,
                namaKategori: true,
                pos: {
                    select:{
                        id: true,
                        namaPos: true,
                        panitia: {
                            select: {
                                id: true,
                                namaPanitia: true
                            }
                        }
                    },
                    orderBy:{
                        namaPos: 'asc'
                    }
                }
            }
        })

        if(!kategoriData) return respon(500, 'error', "Gagal mendapatkan data...")

        return respon(200, 'ok', "Berhasil mendapatkan data...", kategoriData)

    } catch (error) {
        if (error instanceof CustomError) {
            return respon(500, 'error', "Server Error...!")
        } else{
            return error
        }
    }
}
