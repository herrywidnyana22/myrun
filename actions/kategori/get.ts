'use server'

import { adminUser } from "@/app/initUser"
import { db } from "@/lib/db"

export async function getKategoriUser(){
    // const currentUser = await getCurrentUser()
    // if (currentUser && currentUser?.role !== Role.PANITIA) return new NextResponse('Unauthorized', { status: 401})
    const currentUser = adminUser.id
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

    return menuPanitia
}

export async function getAllKategori(){
    try {
        const kategoriData = await db.kategori.findMany({
            select:{
                id:true,
                namaKategori: true,
                pos: true
            }
        })

        if(!kategoriData) throw new Error("Gagal memperbarui data...")

        return kategoriData

    } catch (error) {
        throw new Error("Kesalahan sistem...")
    }
}