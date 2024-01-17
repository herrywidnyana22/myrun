"use server"

import { panitiaUser } from "@/app/initUser"
import { db } from "@/lib/db"
import { formatURL } from "@/lib/formatter"
import { Role } from "@prisma/client"


export async function getPos (menuName: string) {

    const role = Role.PANITIA
    const namaKategori = formatURL(menuName)
    
    const getMenu = await db.pos.findMany({
        select:{
            id: true,
            namaPos: true
        },

        where:{
            kategori:{
                namaKategori: namaKategori
            }
        },

        orderBy:{
            namaPos: "asc"
        }
    })
    // return NextResponse.json(getMenu)
    return getMenu
}

export async function getPosName(menuName: string) {
    const namaKategori = formatURL(menuName)
    // const currentUser = await getCurrentUser()
    const currentUser = panitiaUser.id

    const getPosName = await db.pos.findFirst({
        select:{
            id: true,
            namaPos: true,
            posFinish: true,
            kategori:{
                select:{
                    id: true,
                    namaKategori:true
                }
            }
        },

        where:{
            AND:[{
                kategori:{
                    namaKategori: namaKategori
                },
                // panitiaId: currentUser?.id
                panitiaId: currentUser
            }]
        }
    })
    // return NextResponse.json(getPosName)
    return getPosName
}
