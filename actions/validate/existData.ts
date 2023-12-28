'use server'

import { db } from "@/lib/db"

export async function existData(data: any, model:string, isEdit:string){

    try {
        let respon: any[]= []
        switch (model) {
            case "kategori":
                if(!isEdit) {
                    respon = await db.kategori.findMany({
                        select:{
                            id: true,
                            namaKategori: true
                        },
    
                        where:{
                            namaKategori: data
                        },
                    })
                    
                } else {
                    respon = await db.kategori.findMany({
                        select:{
                            id: true,
                            namaKategori: true
                        },
    
                        where:{
                            AND: [
                                {
                                    namaKategori: data
                                }, {
                                    id:{
                                        not: isEdit
                                    }
                                }
                        ]},
                    })
                }
                    
                break
            
            case "panitia":
                if(!isEdit){
                    respon = await db.panitia.findMany({
                        select:{
                            id: true,
                            username: true
                        },
    
                        where:{
                            username: data
                        },
                    })
                } else {
                        respon = await db.panitia.findMany({
                        select:{
                            id: true,
                            username: true
                        },
    
                        where:{
                            AND:[
                                {
                                    username: data
                                }, {
                                    id: {
                                        not: isEdit
                                    }
                                }
                            ]
                        }
                    })
                }
                
                    
            break
    
            case "peserta":
                respon = await db.peserta.findMany({
                    select:{
                        id: true,
                        noPeserta: true
                    },
    
                    where:{
                        AND:[
                            {
                                noPeserta: data
                            }, {
                                posId:{
                                    hasSome: [isEdit]
                                }
                            }
                        ]
                    },
                })
                    
            break
                
            default:
                break;
        }
    
    
        if(respon.length === 0) {
            return {
                status: 'ok',
                code: '200'
            }
        }
        
        return {
            status: 'duplicate',
            code: '409',
            data: respon
        }
        
    } catch (error) {
        return{
            error: error
        }
    }
    
}