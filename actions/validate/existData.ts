'use server'

import { db } from "@/lib/db"

export async function existData(
    data: any, 
    model:string, 
    dataID?:string, 
    pesertaID?: string 
){

    try {
        let respon: any[]= []
        switch (model) {
            case "kategori":
                if(!dataID) {
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
                                        not: dataID
                                    }
                                }
                        ]},
                    })
                }
                    
                break
            
            case "panitia":
                if(!dataID){
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
                    respon = await db.peserta.findMany({
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
    
    
        if(respon.length === 0) {
            return false
        }
        
        return true
        
    } catch (error) {
        return{
            msg: error
        }
    }
    
}