'use server'

import { db } from "@/lib/db"

export async function getKategoriUser(){
    // const currentUser = await getCurrentUser()
    // if (currentUser && currentUser?.role !== Role.PANITIA) return new NextResponse('Unauthorized', { status: 401})
    const currentUser = "649150f9ee778183c0079cf2"
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