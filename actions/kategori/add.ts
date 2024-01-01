'use server'

import { AddKategoriDataFormat } from "@/app/(main)/dashboard/[tabelmenu]/components/form-addKategori"
import { db } from "@/lib/db"

// interface NamaPosInput {
//   name: string
//   finish: number | string | null
// }

// interface FormData {
//   namaPos: NamaPosInput[]
//   namaKategori: string
//   jumlahPos: string | number
// }



export async function addKategori(data:AddKategoriDataFormat) {
    

    // body
    // {
    //     namaPos: [ { name: 'pos 1', finish: null }, { name: 'pos 2', finish: '1' } ],
    //     namaKategori: 'dewasa',
    //     jumlahPos: '2'
    // }

    // data
    // {
    //     namaPos: [ { id: "fieldID", name: 'nama input', posFinish: null, value: "pos 1" }, { name: 'pos 2', finish: '1' } ],
    //     namaKategori: 'dewasa',
    //     jumlahPos: '2'
    // }

    try {

    
        // check exist data
        // if(!currentUser?.role === "admin"){
        //     return new NextResponse('Unauthorized', { status: 401})
    
        // }
        const addKategori = await db.kategori.create({
            data: {
                namaKategori: data.namaKategori,
                pos:{
                    createMany:{
                        data: data.namaPos.map((data) => ({ 
                            namaPos: data.value,   
                            posFinish: data.posFinish
                        }))
                    }
                }
            }
            
        })

        console.log({data})
        console.log(data.namaPos)

        return {
            data: addKategori
        }
        
    } catch (error: any) {
        return{
            error: error
        }
    }

    
}
