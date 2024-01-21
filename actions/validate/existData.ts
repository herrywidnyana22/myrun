'use server'

import { db } from "@/lib/db"
import { CustomError, respon } from "@/types"

export async function existData(
    data: any, 
    model:string, 
    dataID?:string, 
    pesertaID?: string 
){

    try {
        let responAction: any[]= []
        switch (model) {
            case "kategori":
                if(!dataID) {
                    responAction = await db.kategori.findMany({
                        select:{
                            id: true,
                            namaKategori: true
                        },
    
                        where:{
                            namaKategori: data
                        },
                    })
                    
                } else {
                    responAction = await db.kategori.findMany({
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
                                        not: dataID
                                    }
                                }
                        ]},
                    })
                }
                    
                break
            
            case "user":
                if(!dataID){
                    responAction = await db.panitia.findMany({
                        select:{
                            id: true,
                            username: true
                        },
    
                        where:{
                            username: data
                        },
                    })
                } else {
                        responAction = await db.panitia.findMany({
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
                                        not: dataID
                                    }
                                }
                            ]
                        }
                    })
                }
                
                    
            break
    
            case "peserta":
                if(pesertaID){
                    responAction = await db.peserta.findMany({
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
                                        hasSome: [dataID!]
                                    }
                                }, {
                                    id:{
                                        not: pesertaID
                                    }
                                }
                            ]
                        },
                    })
                } else {
                    responAction = await db.peserta.findMany({
                        select:{
                            id: true,
                            noPeserta: true,
                        },
        
                        where:{
                            AND:[
                                {
                                    noPeserta: data
                                }, {
                                    posId:{
                                        hasSome: [dataID!]
                                    }
                                }
                            ]
                        },
                    })
                }
                    
            break
                
            default:
                break;
        }
    
    
        if(responAction.length === 0) {
            return respon(200, 'ok', "Not duplicate...!", false)
        }
        
        return respon(409, 'error', "duplicate...!", true)
        
    } catch (error) {
        if (error instanceof CustomError) {
            return respon(500, 'error', "Server Error...!")
        } else{
            return error
        }
    }
    
}