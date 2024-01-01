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
                    console.log("true")
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
                    console.log("false")
                    console.log({data})
                    console.log({dataID})
                    console.log({pesertaID})
                    console.log({model})
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

                console.log({respon})
                    
            break
                
            default:
                break;
        }
    
    
        if(respon.length === 0) {
            return false
        }

        console.log( {data})
        console.log( {model})
        console.log( `Respon length : ${respon.length}`)
        
        return true
        
    } catch (error) {
        return{
            error: error
        }
    }
    
}