'use server'

import { AddKategoriDataFormat } from "@/app/(main)/dashboard/[tabelmenu]/components/form-addKategori"
import { db } from "@/lib/db"


export async function addKategori(data:AddKategoriDataFormat) {
    
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

        // check exist nama kategori
        const {namaPos, namaKategori, jumlahPos} = data

        const hasEmptyValues = data.namaPos.some(posItem => {
            return posItem.value === "" || posItem.name === "" || posItem.posFinish === null;
        });

        if (hasEmptyValues || data.namaKategori === "" || data.jumlahPos === "") {
            throw new Error("Tidak boleh kosong..!")
        }

        const isExist = await db.kategori.findFirst({
            where:{
                namaKategori 
            }
        })

        if(isExist) {
           throw new Error("Nama Kategori sudah digunakan..!")
        }

        const addKategori = await db.kategori.create({
            data: {
                namaKategori: data.namaKategori,
                pos:{
                    createMany:{
                        data: namaPos.map((posItem) => ({ 
                            namaPos: posItem.value,   
                            posFinish: posItem.posFinish
                        }))
                    }
                }
            }
            
        })

        

        return {
            data: addKategori
        }
        
    } catch (error: any) {
        return{
            msg: error.message
        }
    }

    
}
